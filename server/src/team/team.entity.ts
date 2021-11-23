import { User_match } from 'src/others/user_match.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  member: string;

  @Column()
  paymentDay: number;

  @Column()
  accountNumber: string;

  @Column()
  accountBank: string;

  @Column()
  inviteCode: string;

  @ManyToMany((type) => User, (users) => users.teams)
  @JoinTable({ name: 'user_team' })
  users: User[];

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'leaderId' })
  user: User;
  //leaderId - > user.id
  //   @OneToMany(type => Photo, photo => photo.user)
  //   photos: Photo[];
}
