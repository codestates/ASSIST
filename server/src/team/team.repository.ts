import { Team } from './team.entity';
import { EntityRepository, Repository, getRepository } from 'typeorm';
import { CreateTeamDto } from './dto/create-dto';
import { v4 as uuid } from 'uuid';
import { User } from 'src/user/user.entity';
import {
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Ipost } from './interface/post.interface';
import { UpdateTeamDto } from './dto/update-dto';

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {
  async createTeam(createTeamDto: CreateTeamDto, user: User): Promise<Ipost> {
    const inviteCode = uuid().slice(0, 6).toUpperCase();
    let team = this.create({
      ...createTeamDto,
      inviteCode,
      leaderId: user,
      users: [user],
    });

    try {
      await this.save(team);
    } catch (err) {
      if (err.errno === 1062) {
        // inviteCode가 이미 존재하는코드일 경우 재귀
        return this.createTeam(createTeamDto, user);
      } else {
        console.log(err);
        throw new InternalServerErrorException();
      }
    }
    return { inviteCode, id: team.id };
  }

  async joinTeam(code: string, user: User) {
    const team = await this.findOne(
      { inviteCode: code },
      { relations: ['users'] },
    );
    if (!team) {
      throw new NotFoundException('초대코드가 잘못되었습니다.');
    }

    const found = team.users.find((users) => users.id === user.id);

    if (found) {
      throw new ConflictException('이미 가입된 유저입니다.');
    }
    team.users.push(user);
    await this.save(team);
    return { id: team.id };
  }

  async patchTeam(found: Team | any, updateTeamDto: UpdateTeamDto) {
    const { leaderId } = updateTeamDto;
    found = { ...found, ...updateTeamDto };
    if (leaderId) {
      found.leaderId = { id: leaderId };
    }
    try {
      await this.save(found);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
    return { message: '수정이 완료되었습니다.' };
  }

  async checkleader(teamId: number, userId: number) {
    const team = await this.findOne({
      where: { id: teamId, leaderId: userId },
    });
    return team ? true : false;
  }
}
