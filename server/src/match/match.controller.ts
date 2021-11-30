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
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-dto';
import { Match } from './match.entity';
import { match } from 'assert';
import { UpdateMatchDto } from './dto/update-dto';

@Controller('match')
@UseGuards(AuthGuard())
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Post()
  createTeam(@Body() createMatchDto: CreateMatchDto, @Req() req: Request) {
    return this.matchService.createTeam(createMatchDto, req.user);
  }
  @Get('/:id')
  getMatchDetail(@Param('id') matchId: number, @Req() req: Request) {
    return this.matchService.getMatchDetail(matchId, req.user);
  }

  @Get('/team/:id')
  getlastMatchs(@Param('id') teamId: number): Promise<Match[]> {
    return this.matchService.getlastMatchs(teamId);
  }

  @Patch('/:id')
  changeCondition(
    @Param('id') matchId: number,
    @Req() req: Request,
    @Body() updateMatchDto: UpdateMatchDto,
  ) {
    return this.matchService.changeCondition(matchId, req.user, updateMatchDto);
  }
}
