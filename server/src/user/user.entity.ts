import { User_match } from 'src/others/user_match.entity';
import { Team } from 'src/team/team.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  gender: string;

  @Column({ default: 'normal' })
  provider: string;

  @Column({ default: '' })
  role: string;

  @ManyToMany((type) => Team, (teams) => teams.users)
  teams: Team[];

  @OneToMany(() => User_match, (user_match) => user_match.user)
  user_matchs!: User_match[];
  //   @OneToMany(type => Photo, photo => photo.user)
  //   photos: Photo[];
}
