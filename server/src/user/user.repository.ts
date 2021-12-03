import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const userInfo = { ...createUserDto };

    const { email, provider, password, phone } = userInfo;

    const found = await this.findOne({
      email,
      provider: provider || 'normal',
    });

    if (found) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    } else {
      const salt: string = await bcrypt.genSalt(10);
      const hashedPassword: string = await bcrypt.hash(password, salt);
      userInfo.password = hashedPassword;
      const user = this.create(userInfo);
      await this.deleteConflictPhone(phone);
      await this.save(user);
      return user;
    }
  }

  async deleteConflictPhone(phone: string) {
    await this.createQueryBuilder('user')
      .update(User)
      .set({ phone: null })
      .where('phone = :phone', { phone })
      .execute();
  }
}
