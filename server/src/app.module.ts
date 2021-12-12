import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TeamModule } from './team/team.module';
import { MatchModule } from './match/match.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/configs/typeorm.config';
import { KakaoAlimModule } from './kakaoalim/kakaoalim.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    TeamModule,
    MatchModule,
    KakaoAlimModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
