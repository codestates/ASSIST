import { Controller, Post, Body, Patch, Get } from '@nestjs/common';

import { MatchService } from 'src/match/match.service';
import { KakaoAlimService } from './kakaoalim.service';

@Controller('kakaoalim')
export class KakaoalimController {
  constructor(private matchService: MatchService, private kakaoAlimService: KakaoAlimService) {}

  @Post('am9')
  async am9() {
    this.kakaoAlimService.sendM017();
    return { message: 'ok' };
  }
  @Post('pm6')
  async pm6() {
    this.kakaoAlimService.sendM004();
    return { message: 'ok' };
  }
  @Post('pm7')
  async pm7() {
    this.kakaoAlimService.sendM005();
    this.matchService.autoFixMatch();
    return { message: 'ok' };
  }
  @Post('pm8')
  async pm8() {
    this.kakaoAlimService.sendM012();
    this.kakaoAlimService.sendM003();
    this.kakaoAlimService.sendT019();

    return { message: 'ok' };
  }
  // @Get('test')
  // async test() {
  //   return await this.kakaoAlimService.sendM017();
  // }
}
