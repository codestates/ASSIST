import { Controller, Post, Body, Patch, Get } from '@nestjs/common';

import { MatchService } from 'src/match/match.service';
import { KakaoAlimService } from './kakaoalim.service';

@Controller('kakaoalim')
export class KakaoalimController {
  constructor(private matchService: MatchService, private kakaoAlimService: KakaoAlimService) {}
  @Post('m006/auto')
  async autoFixMatch() {
    return await this.matchService.autoFixMatch();
  }

  @Post('/test')
  async test() {
    return await this.kakaoAlimService.sendM007();
  }
}
