import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KakaoAlimModule } from 'src/kakaoalim/kakaoalim.module';
import { KakaoAlimService } from 'src/kakaoalim/kakaoalim.service';
import { Alarm_schedule } from 'src/others/alarm.entity';
import { TeamRepository } from 'src/team/team.repository';
import { UserModule } from 'src/user/user.module';
import { MatchController } from './match.controller';
import { AlarmRepository, MatchRepository, UserMatchRepository } from './match.repository';
import { MatchService } from './match.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MatchRepository,
      TeamRepository,
      UserMatchRepository,
      AlarmRepository,
    ]),
    UserModule,
    KakaoAlimModule,
  ],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
