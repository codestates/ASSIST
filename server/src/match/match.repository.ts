import { Match } from './match.entity';
import { EntityRepository, Repository } from 'typeorm';
import { User_match } from 'src/others/user_match.entity';
import { Alarm_schedule } from 'src/others/alarm.entity';

@EntityRepository(Match)
export class MatchRepository extends Repository<Match> {}

@EntityRepository(User_match)
export class UserMatchRepository extends Repository<User_match> {}

@EntityRepository(Alarm_schedule)
export class AlarmRepository extends Repository<Alarm_schedule> {}
