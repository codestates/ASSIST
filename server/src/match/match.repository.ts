import { Match } from './match.entity';
import { EntityRepository, Repository } from 'typeorm';
import { User_match } from 'src/others/user_match.entity';
import { Alarm_schedule } from 'src/others/alarm.entity';
import { User } from 'src/user/user.entity';
import { Raw } from 'typeorm';
import { getDate } from 'src/common/getDate';
@EntityRepository(Match)
export class MatchRepository extends Repository<Match> {
  async getNextMatch(teamId: number, user: User) {
    const nextMatch: any = await this.findOne({
      relations: ['user_matchs', 'user_matchs.user'],
      where: {
        date: Raw((alias) => `${alias} >= :date`, {
          date: getDate(),
        }),
        team: { id: teamId },
        condition: Raw((alias) => `${alias} IN (:...condition)`, {
          condition: ['경기 확정', '인원 모집 중'],
        }),
      },
    });

    if (nextMatch) {
      let find = nextMatch.user_matchs.find((el) => el.id === user.id);

      nextMatch.vote = false;
      if (find) {
        if (find.condition === '찬성' || find.condition === '미정' || find.condition === '불참') {
          nextMatch.vote = true;
        }
      }
      delete nextMatch.user_matchs;

      if (nextMatch.condition === '인원 모집 중') {
        const matchtime = new Date(nextMatch.date + 'T' + '19:00');

        matchtime.setDate(matchtime.getDate() - 1);

        if (matchtime < new Date()) {
          nextMatch.condition = '경기 확정';
          await this.save(nextMatch);
        }
      }
    }
    return nextMatch ? nextMatch : null;
  }
}

@EntityRepository(User_match)
export class UserMatchRepository extends Repository<User_match> {}

@EntityRepository(Alarm_schedule)
export class AlarmRepository extends Repository<Alarm_schedule> {}
