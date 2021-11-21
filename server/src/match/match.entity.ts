import { Alarm_schedule } from 'src/others/alarm.entity';
import { Request_mercenery } from 'src/others/request_mercenery.entity';
import { User_match } from 'src/others/user_match.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  station: string;

  @Column()
  condition: string;

  @Column()
  date: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column()
  voteTime: string;

  @OneToMany(() => User_match, (user_match) => user_match.match)
  user_matchs!: User_match[];

  @OneToMany(() => Request_mercenery, (request) => request.match)
  mercenery: Request_mercenery[];

  @OneToOne(() => Alarm_schedule)
  @JoinColumn()
  alarm: Alarm_schedule;
  //   @OneToMany(type => Photo, photo => photo.user)
  //   photos: Photo[];
}
