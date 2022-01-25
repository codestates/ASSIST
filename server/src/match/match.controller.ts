import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  Param,
  Req,
  Query,
  UseGuards,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-dto';
import { Match } from './match.entity';
import { UpdateMatchDto } from './dto/update-dto';
import { VoteMatchDto } from './dto/vote-dto';
import { MerceneryDto } from './dto/mercenery-dto';

@Controller('match')
@UseGuards(AuthGuard())
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Post()
  createTeam(@Body() createMatchDto: CreateMatchDto, @Req() req: Request) {
    return this.matchService.createTeam(createMatchDto, req.user);
  }
  @Get('/:id')
  getMatchDetail(@Param('id', ParseIntPipe) matchId: number, @Req() req: Request) {
    return this.matchService.getMatchDetail(matchId, req.user);
  }

  @Get('/team/:id')
  getlastMatchs(
    @Param('id', ParseIntPipe) teamId: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Req() req: Request,
  ): Promise<Match[]> {
    return this.matchService.getlastMatchs(teamId, page, limit, req.user);
  }

  @Patch('/:id')
  changeCondition(
    @Param('id', ParseIntPipe) matchId: number,
    @Req() req: Request,
    @Body() updateMatchDto: UpdateMatchDto,
  ) {
    return this.matchService.changeCondition(matchId, req.user, updateMatchDto);
  }

  @Patch('/:id/vote')
  voteMatch(
    @Param('id', ParseIntPipe) matchId: number,
    @Req() req: Request,
    @Body() voteMatchDto: VoteMatchDto,
  ) {
    return this.matchService.voteMatch(matchId, req.user, voteMatchDto);
  }

  @Post('/:id/mercenery')
  requestMercenery(
    @Param('id', ParseIntPipe) id: number,
    @Body() merceneryDto: MerceneryDto,
    @Req() req: Request,
  ) {
    return this.matchService.requestMercenery(id, merceneryDto, req.user);
  }
}
