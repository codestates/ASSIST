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

@Injectable()
export class MatchService {
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

    const data = users.map((user) => {
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

    //이후 알림톡보내기

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
          'user_match.reason',
          'user.name',
          'user.phone',
          'user.id',
          'match',
        ])
        .leftJoin('match.user_matchs', 'user_match')
        .leftJoin('user_match.user', 'user')
        .where('user_match.match = :id', { id: matchId })
        .getOne();
    } catch (err) {
      throw new InternalServerErrorException('database err');
    }

    data.vote = true;
    data.attend = [];
    data.absent = [];
    data.hold = [];
    data.nonRes = [];

    data.user_matchs.forEach((el) => {
      console.log(el.user);
      switch (el.condition) {
        case '미응답':
          if (el.user.id === user.id) data.vote = false;
          data.nonRes.push(el);
          break;
        case '참석':
          data.attend.push(el);
          break;
        case '불참':
          data.absent.push(el);
          break;
        case '보류':
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
          date: new Date().toISOString().slice(0, 10),
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
    const match = await this.matchRepository.findOne({ id: matchId }, { relations: ['team'] });
    if (!match) {
      throw new NotFoundException('해당 경기가 존재하지 않습니다.');
    }
    let check = await this.teamRepository.checkleader(match.team.id, user.id);

    if (!check) {
      throw new BadRequestException('경기 상태 변경은 팀장만 가능합니다.');
    }

    if (match.condition === '경기 완료' || match.condition === '경기 취소') {
      throw new BadRequestException('해당 경기는 변경할 수 없습니다.');
    }
    match.condition = updateMatchDto.condition;
    this.matchRepository.save(match);
    return { message: 'ok' };
  }

  async voteMatch(matchId: number, user: User, voteMatchDto: VoteMatchDto) {
    const { vote } = voteMatchDto;

    const match = await this.matchRepository.findOne({ id: matchId });
    console.log(match);

    // 여기서 데드라인 체크하는거 필요함.

    await this.userMatchRepository
      .createQueryBuilder('user_match')
      .update(User_match)
      .set({ condition: vote })
      .where('matchId = :matchId', { matchId })
      .andWhere('userId = :userId', { userId: user.id })
      .execute();

    return { message: 'ok' };
  }

  async fixMatch() {
    let now = new Date();
    let nextday = new Date(now.setDate(now.getDate() + 1)).toISOString().slice(0, 10);

    const data = await this.matchRepository.find({ date: nextday });

    console.log(data);
  }
}
