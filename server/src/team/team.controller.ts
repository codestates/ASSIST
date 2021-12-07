import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  Param,
  Req,
  UseGuards,
  Delete,
  Query,
} from '@nestjs/common';
import { query, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CreateTeamDto } from './dto/create-dto';
import { TeamService } from './team.service';
import { Ipost } from './interface/post.interface';
import { UpdateTeamDto } from './dto/update-dto';
import { Team } from './team.entity';
import { IgetMember } from './interface/getMember.interface';

@Controller('team')
@UseGuards(AuthGuard())
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Post()
  createTeam(
    @Body() createTeamDto: CreateTeamDto,
    @Req() req: Request,
  ): Promise<Ipost> {
    return this.teamService.createTeam(createTeamDto, req.user);
  }

  @Post('/join')
  joinTeam(@Body('code') code: string, @Req() req: Request): Promise<object> {
    return this.teamService.joinTeam(code, req.user);
  }

  @Get('/check')
  checkTeam(@Query('code') code: string): Promise<Team> {
    return this.teamService.checkCode(code);
  }

  @Get('/:id')
  getDetail(@Param('id') id: number, @Req() req: Request): Promise<Team> {
    return this.teamService.getDetail(id, req.user);
  }

  @Patch('/:id')
  patchTeam(
    @Param('id') id: number,
    @Body() updateTeamDto: UpdateTeamDto,
    @Req() req: Request,
  ): Promise<object> {
    return this.teamService.patchTeam(id, updateTeamDto, req.user);
  }

  @Get('/:id/member')
  getMember(@Param('id') id: number): Promise<IgetMember> {
    return this.teamService.getMember(id);
  }

  @Delete('/:id')
  deleteTeam(@Param('id') id: number, @Req() req: Request): Promise<object> {
    return this.teamService.deleteTeam(id, req.user);
  }
  @Delete(':id/member/:userId')
  kickMember(
    @Param('id') id: number,
    @Param('userId') userId: number,
    @Req() req: Request,
  ) {
    return this.teamService.kickMember(id, userId, req.user);
  }
}
