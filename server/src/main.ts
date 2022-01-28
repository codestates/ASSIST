import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as schedule from 'node-schedule';
// import { ScheduleService } from './kakaoalim/kakaoalim.service';
import { MatchService } from './match/match.service';
import axios from 'axios';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, credentials: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(80);

  let am9 = schedule.scheduleJob('00 09 * * *', () => {
    console.log('오전 9시 예약 시작');
    axios.post(`${process.env.SERVER_URL}/kakaoalim/am9`, {}, { withCredentials: true });
  });

  let pm6 = schedule.scheduleJob('00 18 * * *', () => {
    console.log('오후 6시 예약 시작');
    axios.post(`${process.env.SERVER_URL}/kakaoalim/pm6`, {}, { withCredentials: true });
  });

  let pm7 = schedule.scheduleJob('00 19 * * *', () => {
    console.log('오후 7시 예약 시작');
    axios.post(`${process.env.SERVER_URL}/kakaoalim/pm7`, {}, { withCredentials: true });
  });

  let pm8 = schedule.scheduleJob('00 20 * * *', () => {
    console.log('오후 8시 예약 시작');
    axios.post(`${process.env.SERVER_URL}/kakaoalim/pm8`, {}, { withCredentials: true });
  });
}
bootstrap();
