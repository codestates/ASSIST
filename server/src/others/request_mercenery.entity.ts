import { Match } from 'src/match/match.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Request_mercenery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  needNumber: number;

  @Column()
  money: number;

  @ManyToOne(() => Match, (match) => match.mercenery)
  match: Match;
}
