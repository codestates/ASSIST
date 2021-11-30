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
import {
  AlarmRepository,
  MatchRepository,
  UserMatchRepository,
} from './match.repository';
import { User_match } from 'src/others/user_match.entity';
import { Match } from './match.entity';
import { UpdateMatchDto } from './dto/update-dto';

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
    const { date, startTime } = dto;
    const alarmTime = new Date(date + ' ' + startTime);
    alarmTime.setHours(alarmTime.getHours() - 1);
    let alarm, match;
    try {
      alarm = await this.alarmRepository.create({ time: alarmTime });
      await this.alarmRepository.save(alarm);

      match = await this.matchRepository.create({
        ...dto,
        alarm,
        team: { id: dto.teamId },
      });
      await this.matchRepository.save(match);
    } catch (err) {
      console.log('match 생성에러', err);
      throw new InternalServerErrorException();
    }
    const { users } = await this.teamRepository.findOne(
      { id: dto.teamId },
      { relations: ['users'], select: ['id'] },
    );

    const data = users.map((user) => {
      return { user, match };
    });

    this.userMatchRepository
      .createQueryBuilder()
      .insert()
      .into(User_match)
      .values(data)
      .execute();

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
          'match',
        ])
        .leftJoin('match.user_matchs', 'user_match')
        .leftJoin('user_match.user', 'user')
        .where('user_match.match = :id', { id: matchId })
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

  async getlastMatchs(teamId: number): Promise<Match[]> {
    return await this.matchRepository.find({
      where: {
        date: Raw((alias) => `${alias} < :date`, {
          date: new Date().toISOString().slice(0, 10),
        }),
        team: { id: teamId },
        condition: Raw((alias) => `${alias} IN (:...condition)`, {
          condition: ['경기 완료', '경기 취소'],
        }),
      },
      order: { date: 'DESC', endTime: 'DESC' },
    });
  }

  async changeCondition(
    matchId: number,
    user: User,
    updateMatchDto: UpdateMatchDto,
  ) {
    console.log(matchId);
    const match = await this.matchRepository.findOne(
      { id: matchId },
      { relations: ['team'] },
    );
    if (!match) {
      throw new NotFoundException('해당 경기가 존재하지 않습니다.');
    }
    let check = await this.teamRepository.checkleader(match.team.id, user.id);

    if (!check) {
      throw new BadRequestException('경기 상태 변경은 팀장만 가능합니다.');
    }
  }
}
