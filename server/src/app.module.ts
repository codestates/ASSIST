import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TeamModule } from './team/team.module';
import { MatchModule } from './match/match.module';
@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), UserModule, TeamModule, MatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
