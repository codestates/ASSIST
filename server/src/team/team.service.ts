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
import { Team } from './team.entity';
import { IgetMember } from './interface/getMember.interface';
import { MatchRepository } from 'src/match/match.repository';
import { Raw } from 'typeorm';

@Injectable()
export class TeamService {
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
    return await this.teamRepository.joinTeam(code, user);
  }

  async getDetail(id: number): Promise<any> {
    const found: any = await this.teamRepository.findOne(
      { id },
      { relations: ['leaderId'] },
    );

    if (!found) {
      throw new NotFoundException('해당 팀이 존재하지 않습니다.');
    }

    delete found.leaderId.password;

    const nextMatch = await this.matchRepository.findOne({
      where: {
        date: Raw((alias) => `${alias} >= :date`, {
          date: new Date().toISOString().slice(0, 10),
        }),
        team: { id },
        condition: Raw((alias) => `${alias} IN (:...condition)`, {
          condition: ['경기 확정', '인원 모집 중'],
        }),
      },
      // order: { date: 'DESC', endTime: 'DESC' },
    });

    const lastMatch = await this.matchRepository.findOne({
      where: {
        date: Raw((alias) => `${alias} < :date`, {
          date: new Date().toISOString().slice(0, 10),
        }),
        team: { id },
        condition: Raw((alias) => `${alias} IN (:...condition)`, {
          condition: ['경기 완료', '경기 취소'],
        }),
      },
      order: { date: 'DESC', endTime: 'DESC' },
    });

    found.nextMatch = nextMatch || null;
    found.lastMatch = lastMatch || null;

    return found;
  }

  async patchTeam(id: number, updateTeamDto: UpdateTeamDto, user: User) {
    const found = await this.teamRepository.findOne(
      { id },
      { relations: ['leaderId'] },
    );

    if (!found) {
      throw new NotFoundException('요청한 팀이 없습니다.');
    }

    if (found.leaderId.id !== user.id) {
      throw new UnauthorizedException('팀 수정은 리더만 할 수 있습니다.');
    }

    if (updateTeamDto.leaderId) {
      const check = await this.userRepository.findOne({
        id: updateTeamDto.leaderId,
      });
      if (!check)
        throw new NotFoundException('리더로 변경할 해당 유저가 없습니다.');
    }
    return this.teamRepository.patchTeam(found, updateTeamDto);
  }

  async deleteTeam(id: number, user: User) {
    let team = await this.teamRepository.findOne(
      { id },
      { relations: ['leaderId', 'users'] },
    );
    if (!team) {
      throw new NotFoundException('요청한 팀이 존재하지 않습니다.');
    }
    if (team.leaderId.id !== user.id) {
      throw new UnauthorizedException('팀 해체는 팀장만 할 수 있습니다.');
    }
    if (team.users.length > 1) {
      throw new BadRequestException('팀 해체는 다른 팀원이 없어야 가능합니다.');
    }

    await this.teamRepository.delete({ id });

    return { message: '완료 되었습니다' };
  }

  async getMember(id: number): Promise<IgetMember> {
    let { users } = await this.teamRepository.findOne({
      where: { id },
      relations: ['users'],
    });
    users.forEach((user) => {
      delete user.password;
    });
    return { count: users.length, users };
  }

  async kickMember(id: number, userId: number, user: User) {
    const team = await this.teamRepository.findOne(
      { id },
      { relations: ['leaderId', 'users'] },
    );
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
    team.users = team.users.filter((el) => el.id !== user.id);
    await this.teamRepository.save(team);
    return { message: '완료되었습니다.' };
  }
}
