import { Match } from './match.entity';
import { EntityRepository, Repository } from 'typeorm';
import { User_match } from 'src/others/user_match.entity';
import { Alarm_schedule } from 'src/others/alarm.entity';
import { User } from 'src/user/user.entity';
import { Raw } from 'typeorm';
@EntityRepository(Match)
export class MatchRepository extends Repository<Match> {
  async getNextMatch(teamId: number, user: User) {
    const nextMatch: any = await this.findOne({
      relations: ['user_matchs'],
      where: {
        date: Raw((alias) => `${alias} >= :date`, {
          date: new Date().toISOString().slice(0, 10),
        }),
        team: { id: teamId },
        condition: Raw((alias) => `${alias} IN (:...condition)`, {
          condition: ['경기 확정', '인원 모집 중'],
        }),
      },
    });

    if (nextMatch) {
      const vote = nextMatch.user_matchs.find((el) => el.id === user.id) ? true : false;

      delete nextMatch.user_matchs;

      if (nextMatch.condition === '인원 모집 중') {
        const matchtime = new Date(nextMatch.date + 'T' + '19:00');

        matchtime.setDate(matchtime.getDate() - 1);

        if (matchtime < new Date()) {
          nextMatch.condition = '경기 확정';
          await this.save(nextMatch);
        }
      }
      nextMatch.vote = vote;
    }
    return nextMatch ? nextMatch : null;
  }
}

@EntityRepository(User_match)
export class UserMatchRepository extends Repository<User_match> {}

@EntityRepository(Alarm_schedule)
export class AlarmRepository extends Repository<Alarm_schedule> {}
