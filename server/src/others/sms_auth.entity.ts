import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Sms_auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: Date;

  @Column()
  number: string;

  @CreateDateColumn()
  createdAt: Date;
  //   @OneToMany(type => Photo, photo => photo.user)
  //   photos: Photo[];
}
