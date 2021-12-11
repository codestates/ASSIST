import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsRepository } from './sms.repository';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import * as config from 'config';
import { KakaoStrategy } from './kakao.strategy';
import { MatchRepository } from 'src/match/match.repository';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserRepository, SmsRepository, MatchRepository]),
    JwtModule.register({
      secret: process.env.ACCESS_SECRET || jwtConfig.ACCESS_SECRET,
      // signOptions: {
      //   expiresIn: '2d',
      // },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, KakaoStrategy],
  exports: [JwtStrategy, PassportModule, KakaoStrategy, UserService],
})
export class UserModule {}
