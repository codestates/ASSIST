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

@Controller('match')
@UseGuards(AuthGuard())
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Post()
  createTeam(@Body() createMatchDto: CreateMatchDto, @Req() req: Request) {
    return this.matchService.createTeam(createMatchDto, req.user);
  }
}
