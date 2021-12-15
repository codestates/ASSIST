import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw } from 'typeorm';
import { Alarm_schedule } from 'src/others/alarm.entity';
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
import { getDate } from 'src/common/getDate';
import { KakaoAlimService } from 'src/kakaoalim/kakaoalim.service';

@Injectable()
export class MatchService {
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

    const { date, startTime, endTime, address, address2 } = dto;
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

    const naverSensService = new NaverSensService();
    const makeM = new MakeM();

    const arr: AlimtalkDto[] = [];
    users.forEach((user) => {
      const { content } = makeM.M001({
        team: name,
        startTime,
        date,
        endTime,
        address,
        address2,
      });
      arr.push({ to: user.phone, content });
    });

    naverSensService.sendKakaoAlarm('M001', arr);

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
        ])
        .leftJoin('match.user_matchs', 'user_match')
        .leftJoin('user_match.user', 'user')
        .where('match.id = :matchId', { matchId })
        .getOne();
    } catch (err) {
      throw new InternalServerErrorException('database err');
    }

    data.attend = [];
    data.absent = [];
    data.hold = [];
    data.nonRes = [];

    data.user_matchs.forEach((el) => {
      switch (el.condition) {
        case '미응답':
          if (el.user.id === user.id) {
            data.vote = false;
          }
          data.nonRes.push(el);
          break;
        case '참석':
          if (el.user.id === user.id) {
            data.vote = 'attend';
          }
          data.attend.push(el);
          break;
        case '불참':
          if (el.user.id === user.id) {
            data.vote = 'absent';
          }
          data.absent.push(el);
          break;
        case '미정':
          if (el.user.id === user.id) {
            data.vote = 'hold';
          }
          data.hold.push(el);
          break;
      }
    });
    delete data.user_matchs;
    return data;
  }

  async getlastMatchs(teamId: number, page: number, limit: number): Promise<any> {
    if (!page) page = 1;
    if (!limit) limit = 5;
    const offset = page * limit - limit;

    const [lastMatchs, count] = await this.matchRepository.findAndCount({
      where: {
        date: Raw((alias) => `${alias} < :date`, {
          date: getDate(),
        }),
        team: { id: teamId },
      },
      order: { date: 'DESC', endTime: 'DESC', id: 'DESC' },
      skip: offset,
      take: limit,
    });

    const totalPage = Math.round(count / limit);

    const payload = { lastMatchs, totalPage };
    if (page === 1) {
      lastMatchs.forEach(async (el) => {
        if (el.condition === '경기 확정' || el.condition === '인원 모집 중') {
          el.condition = '경기 완료';
          await this.matchRepository.save(el);
        }
      });
    }
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
      this.kakaoAlimService.sendM006(match);
    }

    if (updateMatchDto.condition === '경기 취소') {
      this.kakaoAlimService.sendM009(match);
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
    if (match.condition === '경기 취소' || '경기 완료') {
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
      this.kakaoAlimService.sendM008(match, beforeCondi, afterCondi);
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
      .andWhere('match.condition = :condition', { condition: '경기 준비 중' })
      .getMany();

    if (!data.length) return { message: '확정할 경기가 없습니다.' };

    const teamIdarr = data.map((el) => el.id);
    const update = await this.matchRepository
      .createQueryBuilder()
      .update(Match)
      .set({
        condition: '경기 확정',
      })
      .where('id IN (:id)', { id: teamIdarr })
      .execute();

    console.log('경기확정완료', update);

    this.kakaoAlimService.autoFixMatchSendM006(data);
    return data;
  }
}
