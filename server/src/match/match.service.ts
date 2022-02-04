import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Raw } from 'typeorm';
import { TeamRepository } from 'src/team/team.repository';
import { User } from 'src/user/user.entity';
import { CreateMatchDto } from './dto/create-dto';
import { AlarmRepository, MatchRepository, UserMatchRepository } from './match.repository';
import { User_match } from 'src/others/user_match.entity';
import { Match } from './match.entity';
import { UpdateMatchDto } from './dto/update-dto';
import { VoteMatchDto } from './dto/vote-dto';
import { NaverSensService } from 'src/common/naver_sens/sens.service';
import { MakeM } from 'src/common/naver_sens/make_M_template';
import { AlimtalkDto } from 'src/common/naver_sens/dto/sendTalk.dto';
import { getDate, getTime } from 'src/common/getDate';
import { KakaoAlimService } from 'src/kakaoalim/kakaoalim.service';
import { convertSMS } from 'src/common/naver_sens/convert_SMS_template';

@Injectable()
export class MatchService {
  makeM = new MakeM();
  naverSensService = new NaverSensService();
  kakaoAlimService = new KakaoAlimService();
  constructor(
    @InjectRepository(MatchRepository)
    private matchRepository: MatchRepository,
    @InjectRepository(TeamRepository)
    private teamRepository: TeamRepository,
    @InjectRepository(UserMatchRepository)
    private userMatchRepository: UserMatchRepository,
    @InjectRepository(AlarmRepository)
    private alarmRepository: AlarmRepository,
  ) {}

  async createTeam(dto: CreateMatchDto, user: User): Promise<{ id: number }> {
    const check = await this.teamRepository.checkleader(dto.teamId, user.id);
    if (!check) {
      throw new BadRequestException('경기는 팀장만 생성 가능합니다.');
    }
    const dayArr = ['일', '월', '화', '수', '목', '금', '토'];

    const { date, startTime, endTime, address, address2, daypassing } = dto;
    const alarmTime = new Date(date + ' ' + startTime);
    const day = dayArr[new Date(date).getDay()];
    alarmTime.setHours(alarmTime.getHours() - 1);

    let alarm, match;
    try {
      alarm = await this.alarmRepository.create({ time: alarmTime });
      await this.alarmRepository.save(alarm);
      match = await this.matchRepository.create({
        ...dto,
        alarm,
        team: { id: dto.teamId },
        day,
      });
      await this.matchRepository.save(match);
    } catch (err) {
      console.log('match 생성에러', err);
      throw new InternalServerErrorException();
    }
    const { name, users } = await this.teamRepository.findOne(
      { id: dto.teamId },
      { relations: ['users'], select: ['id', 'name'] },
    );

    const leaderId = user.id;
    const data = users.map((user) => {
      if (user.id === leaderId) {
        return { user, condition: '참석', match };
      }
      return { user, match };
    });

    this.userMatchRepository.createQueryBuilder().insert().into(User_match).values(data).execute();

    const arr: AlimtalkDto[] = [];
    const smsArr = [];

    users.forEach((user) => {
      const message = this.makeM.M011(user.phone, {
        matchId: match.id,
        team: name,
        startTime,
        date,
        endTime,
        address,
        address2,
      });
      if (user?.provider === 'kakao') {
        arr.push(message);
      } else {
        smsArr.push(convertSMS(message));
      }
    });

    if (arr.length) {
      this.naverSensService.sendKakaoAlarm('M011', arr);
    }

    if (smsArr.length) {
      this.naverSensService.sendGroupSMS(smsArr);
    }

    return { id: match.id };
  }

  async getMatchDetail(matchId: number, user: User) {
    let data;
    try {
      data = await this.matchRepository
        .createQueryBuilder('match')
        .select([
          'user_match.id',
          'user_match.condition',
          'user.name',
          'user.phone',
          'user.id',
          'match',
          'team.id',
        ])
        .leftJoin('match.user_matchs', 'user_match')
        .leftJoin('user_match.user', 'user')
        .leftJoin('match.team', 'team')
        .where('match.id = :matchId', { matchId })
        .getOne();
    } catch (err) {
      throw new InternalServerErrorException('database err');
    }
    if (!data) throw new NotFoundException('해당 경기가 존재하지 않습니다.');

    const checkMember = await this.teamRepository.checkMember(data.team.id, user.id);
    if (!checkMember) throw new NotFoundException('해당 유저는 팀원이 아닙니다.');

    const change = checkCondi();

    function checkCondi(): boolean {
      if (
        data.condition === '인원 모집 중' ||
        data.condition === '경기 확정' ||
        data.condition === '경기중'
      ) {
        if (
          data.date < getDate(-1) ||
          (data.date === getDate() && data.daypassing === false && data.endTime < getTime()) ||
          (data.date === getDate(-1) &&
            ((data.daypassing === true && data.endTime < getTime()) || data.daypassing === false))
        ) {
          data.condition = '경기 완료';
          return true;
        }

        if (data.condition !== '경기중') {
          if (data.date === getDate() && data.startTime < getTime()) {
            data.condition = '경기중';
            return true;
          }
          if (data.date === getDate(-1) && data.daypassing === true) {
            data.condition = '경기중';
            return true;
          }
        }
      }
      return false;
    }

    if (change) {
      await this.matchRepository.save(data);
    }

    data.attend = [];
    data.absent = [];
    data.hold = [];
    data.nonRes = [];

    console.log(data);

    data.user_matchs.forEach((el) => {
      switch (el.condition) {
        case '미응답':
          if (el.user?.id === user.id) {
            data.vote = 'nonRes';
          }
          data.nonRes.push(el);
          break;
        case '참석':
          if (el.user?.id === user.id) {
            data.vote = 'attend';
          }
          data.attend.push(el);
          break;
        case '불참':
          if (el.user?.id === user.id) {
            data.vote = 'absent';
          }
          data.absent.push(el);
          break;
        case '미정':
          if (el.user?.id === user.id) {
            data.vote = 'hold';
          }
          data.hold.push(el);
          break;
      }
    });
    delete data.user_matchs;

    return data;
  }

  async getlastMatchs(teamId: number, page: number, limit: number, user: User): Promise<any> {
    const checkMember = await this.teamRepository.checkMember(teamId, user.id);
    if (!checkMember) throw new NotFoundException('가입된 팀이 아닙니다.');

    if (!page) page = 1;
    if (!limit) limit = 5;
    const offset = page * limit - limit;

    const queryString = `update assist.match as m set m.condition = '경기 완료' where 
    (m.teamId = ${teamId} and m.condition in ('경기 확정', '인원 모집 중') and (date < '${getDate(
      -1,
    )}' or (endTime >= '${getTime()}' and ((date= '${getDate(
      -1,
    )}' and daypassing=true) or (date= '${getDate()}' and daypassing= false)))))`;
    const update = await getManager().query(queryString);

    const [lastMatchs, count] = await this.matchRepository.findAndCount({
      where: {
        team: { id: teamId },
        condition: Raw((alias) => `${alias} IN (:condition)`, {
          condition: ['경기 취소', '경기 완료'],
        }),
      },
      order: { date: 'DESC', endTime: 'DESC', id: 'DESC' },
      skip: offset,
      take: limit,
    });

    const totalPage = Math.ceil(count / limit);

    const payload = { lastMatchs, totalPage };

    return payload;
  }

  async changeCondition(matchId: number, user: User, updateMatchDto: UpdateMatchDto) {
    let match = await this.matchRepository
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.team', 'team')
      .leftJoinAndSelect('match.user_matchs', 'user_match')
      .leftJoinAndSelect('user_match.user', 'user')
      .where('match.id = :id', { id: matchId })
      .getOne();

    if (!match) {
      throw new NotFoundException('해당 경기가 존재하지 않습니다.');
    }

    if (match.condition === '경기 완료' || match.condition === '경기 취소') {
      throw new BadRequestException('해당 경기는 변경할 수 없습니다.');
    }
    let check = await this.teamRepository.checkleader(match.team.id, user.id);

    if (!check) {
      throw new BadRequestException('경기 상태 변경은 팀장만 가능합니다.');
    }

    match.condition = updateMatchDto.condition;
    if (updateMatchDto.condition === '경기 취소') {
      if (!updateMatchDto.reason) {
        throw new BadRequestException('경기 취소 사유를 보내주세요.');
      }
      match.reason = updateMatchDto.reason;
    }

    await this.matchRepository.save(match);

    if (updateMatchDto.condition === '경기 확정') {
      this.kakaoAlimService.sendM016(match);
    }

    if (updateMatchDto.condition === '경기 취소') {
      this.kakaoAlimService.sendM029(match);
    }
    return { message: 'ok' };
  }

  async voteMatch(matchId: number, user: User, voteMatchDto: VoteMatchDto) {
    const { vote } = voteMatchDto;

    let match = await this.matchRepository
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.team', 'team')
      .leftJoinAndSelect('match.user_matchs', 'user_match')
      .leftJoinAndSelect('user_match.user', 'user')
      .leftJoinAndSelect('team.leaderId', 'leaderId')
      .where('match.id = :id', { id: matchId })
      .andWhere('user.id =:userId', { userId: user.id })
      .getOne();

    if (!match) {
      throw new NotFoundException('해당 경기가 존재하지 않습니다.');
    }

    const beforeCondi = match.user_matchs[0].condition;
    const afterCondi = voteMatchDto.vote;

    if (beforeCondi === afterCondi) {
      throw new NotFoundException(`이미 ${beforeCondi}으로 투표하셨습니다.`);
    }
    if (match.condition === '경기 취소' || match.condition === '경기 완료') {
      throw new NotFoundException('해당 경기에 투표할 수 없습니다.');
    }
    await this.userMatchRepository
      .createQueryBuilder('user_match')
      .update(User_match)
      .set({ condition: vote })
      .where('matchId = :matchId', { matchId })
      .andWhere('userId = :userId', { userId: user.id })
      .execute();

    if (match.condition === '경기 확정') {
      this.kakaoAlimService.sendM018(match, beforeCondi, afterCondi);
    }

    return { message: 'ok' };
  }

  async autoFixMatch() {
    const nextday = getDate(1);

    let data: any = await this.matchRepository
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.team', 'team')
      .leftJoinAndSelect('match.user_matchs', 'user_match')
      .leftJoinAndSelect('user_match.user', 'user')
      .where('match.date = :date', { date: nextday })
      .andWhere('match.condition = :condition', { condition: '인원 모집 중' })
      .getMany();

    if (!data.length) return { message: '확정할 경기가 없습니다.' };

    const matchIdarr = data.map((el) => el.id);

    const update = await this.matchRepository
      .createQueryBuilder()
      .update(Match)
      .set({
        condition: '경기 확정',
      })
      .where('id IN (:id)', { id: matchIdarr })
      .execute();

    console.log('경기확정완료', update);

    this.kakaoAlimService.autoFixMatchSendM016(data);
    return data;
  }

  async requestMercenery(id, merceneryDto, user) {
    const match: any = await this.matchRepository.findOne(
      { id },
      { relations: ['team', 'team.leaderId'] },
    );

    if (user.id !== match.team.leaderId.id) {
      throw new BadRequestException('용병 구인은 팀장만 가능합니다.');
    }

    const template = `
    팀이름 : ${match.team.name},
    -경기정보

    날짜 : ${match.date} ${match.day}
    시간 : ${match.startTime} ~ ${match.endTime}
    장소 :${match.address} ${match.address2}

    주장이름 : ${match.team.leaderId.name}
    주장번호 : ${match.team.leaderId.phone}
    필요인원 ${merceneryDto.needNumber}명
    참가비 ${merceneryDto.money}원`;

    this.naverSensService.sendSMS(process.env.HOST_PHONE, template, 'LMS');
    this.kakaoAlimService.sendM030(match, merceneryDto, user);
    return { message: 'ok' };
  }
}
