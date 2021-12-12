import { Alarm_schedule } from 'src/others/alarm.entity';
import { Request_mercenery } from 'src/others/request_mercenery.entity';
import { User_match } from 'src/others/user_match.entity';
import { Team } from 'src/team/team.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Match extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  address2: string;

  @Column({ default: '인원 모집 중' })
  condition: string;

  @Column()
  reason: string;

  @Column()
  date: string;

  @Column()
  day: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column()
  deadline: string;

  @OneToMany(() => User_match, (user_match) => user_match.match)
  user_matchs: User_match[];

  @ManyToOne(() => Team, (team) => team.match)
  team: Team;

  @OneToMany(() => Request_mercenery, (request) => request.match)
  mercenery: Request_mercenery[];

  @OneToOne(() => Alarm_schedule)
  @JoinColumn()
  alarm: Alarm_schedule;
}
