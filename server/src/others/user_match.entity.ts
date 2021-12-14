import { Match } from 'src/match/match.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class User_match {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ default: '미응답' })
  condition: string;

  @ManyToOne(() => User, (user) => user.user_matchs)
  user: User;

  @ManyToOne(() => Match, (match) => match.user_matchs)
  match: Match;
  // @OneToMany((type) => Photo, (photo) => photo.user)
  // photos: Photo[];
}
