import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/user.repository';
import { TeamController } from './team.controller';
import { TeamRepository } from './team.repository';
import { TeamService } from './team.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamRepository, UserRepository]),
    UserModule,
  ],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
