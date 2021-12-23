import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { TeamRepository } from './team.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeamDto } from './dto/create-dto';
import { User } from 'src/user/user.entity';
import { Ipost } from './interface/post.interface';
import { UpdateTeamDto } from './dto/update-dto';
import { UserRepository } from 'src/user/user.repository';
import { IgetMember } from './interface/getMember.interface';
import { MatchRepository } from 'src/match/match.repository';
import { Team } from './team.entity';
import { getManager, getRepository, Raw } from 'typeorm';
import { NaverSensService } from 'src/common/naver_sens/sens.service';
import { MakeT } from 'src/common/naver_sens/make_T_template';
import { getDate } from 'src/common/getDate';
import { User_match } from 'src/others/user_match.entity';

@Injectable()
export class TeamService {
  makeT = new MakeT();
  naverSensService = new NaverSensService();
  constructor(
    @InjectRepository(TeamRepository)
    private teamRepository: TeamRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(MatchRepository)
    private matchRepository: MatchRepository,
  ) {}

  async createTeam(createTeamDto: CreateTeamDto, user: User): Promise<Ipost> {
    return await this.teamRepository.createTeam(createTeamDto, user);
  }

  async joinTeam(code: string, user: User): Promise<any> {
    const team = await this.teamRepository.joinTeam(code, user);

    const nextMatchs: any = await this.matchRepository.find({
      relations: ['user_matchs'],
      where: {
        team: { id: team.id },
        condition: Raw((alias) => `${alias} IN (:...condition)`, {
          condition: ['경기 확정', '인원 모집 중'],
        }),
      },
    });

    const userMatchRepo = getRepository(User_match);

    if (nextMatchs.length) {
      nextMatchs.forEach(async (el) => {
        const vote = userMatchRepo.create({ condition: '미응답', user, match: el });
        await userMatchRepo.save(vote);
      });
    }

    if (user?.provider === 'kakao') {
      const info = {
        teamId: team.id,
        team: team.name,
        code: team.inviteCode,
        name: user.name,
        leader: team.leaderId.name,
        to: user.phone,
      };
      const form1 = this.makeT.T011(info.to, info);
      this.naverSensService.sendKakaoAlarm('T011', [form1]);
    }

    if (team.leaderId?.provider === 'kakao') {
      const info2 = {
        teamId: team.id,
        team: team.name,
        name: user.name,
        to: team.leaderId.phone,
      };
      const form2 = this.makeT.T002(info2.to, info2);
      this.naverSensService.sendKakaoAlarm('T002', [form2]);
    }

    return { id: team.id };
  }

  async checkCode(code: string): Promise<Team> {
    const found: any = await this.teamRepository.findOne(
      { inviteCode: code },
      { relations: ['leaderId'] },
    );

    if (!found) throw new NotFoundException('잘못된 코드입니다.');

    found.leaderName = found.leaderId.name;
    found.leaderId = found.leaderId.id;

    return found;
  }
  async getDetail(id: number, user: User): Promise<any> {
    const check = await getManager().query(
      `SELECT team.name,paymentDay,accountNumber,accountBank,dues,inviteCode,leaderId,b.name as leaderName,b.phone as leaderPhone
       FROM user_team join team on team.id = user_team.teamId join user as b on team.leaderId = b.id where teamId = ${id} and userId = ${user.id} `,
    );

    if (!check.length) {
      throw new NotFoundException('가입된 팀이 아닙니다.');
    }

    const nextMatch = await this.matchRepository.getNextMatch(id, user);
    check[0].nextMatch = nextMatch;

    return check[0];
  }

  async patchTeam(id: number, updateTeamDto: UpdateTeamDto, user: User) {
    const found = await this.teamRepository.findOne({ id }, { relations: ['leaderId'] });

    if (!found) {
      throw new NotFoundException('요청한 팀이 없습니다.');
    }

    if (found.leaderId?.id !== user.id) {
      throw new UnauthorizedException('팀 수정은 리더만 할 수 있습니다.');
    }

    let leader;
    if (updateTeamDto.leaderId) {
      leader = await this.userRepository.findOne({
        id: updateTeamDto.leaderId,
      });
      if (!leader) throw new NotFoundException('리더로 변경할 해당 유저가 없습니다.');
    }

    let returnData = await this.teamRepository.patchTeam(found, updateTeamDto);

    if (leader) {
      if (user?.provider === 'kakao') {
        console.log('위임한 친구의 provider', user.provider);
        let form1 = this.makeT.T003(user.phone, {
          teamId: found.id,
          team: found.name,
          leader: leader.name,
        });
        await this.naverSensService.sendKakaoAlarm('T003', [form1]);
      }

      if (leader.provider === 'kakao') {
        console.log('위임된친구의 provider', leader.provider);
        let form2 = this.makeT.T014(leader.phone, {
          teamId: found.id,
          team: found.name,
          leader: user.name,
        });
        await this.naverSensService.sendKakaoAlarm('T014', [form2]);
      }
    }

    return returnData;
  }

  async deleteTeam(id: number, user: User) {
    let team = await this.teamRepository.findOne({ id }, { relations: ['leaderId', 'users'] });
    if (!team) {
      throw new NotFoundException('요청한 팀이 존재하지 않습니다.');
    }
    if (team.leaderId.id !== user.id) {
      throw new UnauthorizedException('팀 해체는 팀장만 할 수 있습니다.');
    }

    let arr = [];
    for (let member of team.users) {
      console.log(member.provider);
      if (member.id === user.id) continue;
      if (member.provider === 'kakao') {
        let form = this.makeT.T005(member.phone, { team: team.name });
        arr.push(form);
      }
    }

    if (arr.length) {
      this.naverSensService.sendKakaoAlarm('T005', arr);
    }

    await this.teamRepository.delete({ id });

    return { message: '완료 되었습니다' };
  }

  async getMember(id: number, user): Promise<IgetMember> {
    let users: any = await getManager().query(
      `SELECT u.id,u.email,u.name,u.phone,u.gender,provider,role,leaderId,inviteCode,team.name as teamName FROM user_team as ut join user as u on u.id = ut.userId 
      join team on team.id = ut.teamId where teamId = ${id} order by case when leaderId = u.id then 1 end desc, binary(u.name)`,
    );

    if (!users.length) {
      throw new NotFoundException('해당 팀은 존재하지 않습니다.');
    }

    const found = users.findIndex((el) => el.id === user.id);

    if (found === -1) {
      throw new NotFoundException('해당 유저는 팀원이 아닙니다.');
    }

    return { count: users.length, users, leaderId: users[0].leaderId };
  }

  async kickMember(id: number, userId: number, user: User) {
    const team = await this.teamRepository.findOne({ id }, { relations: ['leaderId', 'users'] });
    if (!team) {
      throw new NotFoundException('해당 팀은 존재하지 않습니다.');
    }
    const leaderId = team.leaderId.id;
    if (leaderId !== user.id) {
      throw new UnauthorizedException('팀원 강퇴는 팀장만 할 수 있습니다.');
    }
    if (userId === user.id) {
      throw new NotFoundException('자기 자신을 강퇴할 수 없습니다.');
    }
    let index = team.users.findIndex((el) => el.id === userId);
    if (index === -1) {
      throw new NotFoundException('해당 유저는 팀원이 아닙니다.');
    }
    let kickUser = team.users.splice(index, 1)[0];
    await this.teamRepository.save(team);

    if (user?.provider === 'kakao') {
      let form1 = this.makeT.T007(user.phone, {
        teamId: team.id,
        team: team.name,
        name: kickUser.name,
      });
      this.naverSensService.sendKakaoAlarm('T007', [form1]);
    }

    if (kickUser.provider === 'kakao') {
      let form2 = this.makeT.T008(kickUser.phone, { team: team.name });
      this.naverSensService.sendKakaoAlarm('T008', [form2]);
    }

    return { message: '완료되었습니다.' };
  }
}
