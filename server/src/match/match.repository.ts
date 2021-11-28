import { Match } from './match.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateMatchDto } from './dto/create-dto';
import { User } from 'src/user/user.entity';
import { User_match } from 'src/others/user_match.entity';
import { Alarm_schedule } from 'src/others/alarm.entity';

@EntityRepository(Match)
export class MatchRepository extends Repository<Match> {
  async createTeam(createMatchDto: CreateMatchDto, user: User) {
    let match = this.create(createMatchDto);
    return await this.save(match);
  }
}

@EntityRepository(User_match)
export class UserMatchRepository extends Repository<User_match> {
  async createTeam(createMatchDto: CreateMatchDto, user: User) {
    // 경기 생성 후 팀원에게 알림톡보내기.
  }
}

@EntityRepository(Alarm_schedule)
export class AlarmRepository extends Repository<Alarm_schedule> {
  async createAlarm() {}
}
