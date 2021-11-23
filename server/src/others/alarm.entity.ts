import { Match } from 'src/match/match.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class Alarm_schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: Date;

  @Column()
  isDeleted: boolean;

  @OneToOne(() => Match, (match) => match.alarm) // specify inverse side as a second parameter
  match: Match;

  //   @OneToMany(type => Photo, photo => photo.user)
  //   photos: Photo[];
}
