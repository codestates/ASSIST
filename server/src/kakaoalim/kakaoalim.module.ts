import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchModule } from 'src/match/match.module';
import { AlarmRepository, MatchRepository, UserMatchRepository } from 'src/match/match.repository';
import { MatchService } from 'src/match/match.service';
import { TeamRepository } from 'src/team/team.repository';
import { KakaoalimController } from './kakaoalim.controller';
import { KakaoAlimService } from './kakaoalim.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MatchRepository,
      TeamRepository,
      UserMatchRepository,
      AlarmRepository,
    ]),
  ],
  providers: [KakaoAlimService, MatchService],
  controllers: [KakaoalimController],
  exports: [KakaoAlimService],
})
export class KakaoAlimModule {}
