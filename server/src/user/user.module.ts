import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsRepository } from './sms.repository';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, SmsRepository])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
