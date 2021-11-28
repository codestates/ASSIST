import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamRepository } from 'src/team/team.repository';
import { User } from 'src/user/user.entity';
import { CreateMatchDto } from './dto/create-dto';
import { MatchRepository, UserMatchRepository } from './match.repository';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(MatchRepository)
    private matchRepository: MatchRepository,
    @InjectRepository(TeamRepository)
    private teamRepository: TeamRepository,
    @InjectRepository(UserMatchRepository)
    private userMatchRepository: UserMatchRepository,
  ) {}

  async createTeam(createMatchDto: CreateMatchDto, user: User) {
    const check = await this.teamRepository.checkleader(
      createMatchDto.teamId,
      user.id,
    );
    if (!check) {
      throw new BadRequestException('경기는 팀장만 생성 가능합니다.');
    }
    const match = await this.matchRepository.createTeam(createMatchDto, user);
  }
}
