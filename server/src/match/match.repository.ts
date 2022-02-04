import { Match } from './match.entity';
import { EntityRepository, Repository } from 'typeorm';
import { User_match } from 'src/others/user_match.entity';
import { Alarm_schedule } from 'src/others/alarm.entity';
import { User } from 'src/user/user.entity';
import { Raw } from 'typeorm';
import { getDate, getTime } from 'src/common/getDate';
@EntityRepository(Match)
export class MatchRepository extends Repository<Match> {
  async getNextMatch(teamId: number, user: User) {
    const nextMatchs: any = await this.find({
      relations: ['user_matchs', 'user_matchs.user'],
      where: {
        team: { id: teamId },
        condition: Raw((alias) => `${alias} IN (:...condition)`, {
          condition: ['경기 확정', '인원 모집 중', '경기중'],
        }),
        date: Raw(
          (alias) => `(${alias} >= :date or (${alias} = '${getDate(-1)}' and daypassing = true))`,
          {
            date: getDate(),
          },
        ),
      },
      order: { date: 'ASC', startTime: 'ASC' },
    });

    const nextMatch = nextMatchs.find((el) => {
      if (el.date === getDate(-1)) {
        if (el.endTime > getTime()) {
          if (el.condition !== '경기중') {
            el.condition = '경기중';
            this.save(el);
          }
        } else return false;
      } else if (el.date === getDate()) {
        if (!el.daypassing) {
          if (el.endTime < getTime()) {
            return false;
          }
        }
        if (el.startTime < getTime()) {
          if (el.condition !== '경기중') {
            el.condition = '경기중';
            this.save(el);
          }
        }
      }
      return true;
    });

    if (nextMatch) {
      let find = nextMatch.user_matchs.find((el) => el.user?.id === user.id);

      nextMatch.vote = false;

      if (find) {
        if (find.condition === '참석' || find.condition === '미정' || find.condition === '불참') {
          nextMatch.vote = true;
        }
      }
      delete nextMatch.user_matchs;
    }
    return nextMatch ? nextMatch : null;
  }
}

@EntityRepository(User_match)
export class UserMatchRepository extends Repository<User_match> {}

@EntityRepository(Alarm_schedule)
export class AlarmRepository extends Repository<Alarm_schedule> {}
