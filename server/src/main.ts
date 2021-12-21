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

  // const scheduleService = new ScheduleService();

  // let pm8 = schedule.scheduleJob('13 22 * * *', () => {
  //   console.log('여기');
  //   axios.post('http://localhost/kakaoalim/8pm', {}, { withCredentials: true });
  // });

  // let sendM007 = schedule.scheduleJob('00 09 * * *', () => {
  //   scheduleService.sendM006();
  //
  // });
}
bootstrap();
