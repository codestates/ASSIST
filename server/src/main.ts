import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as schedule from 'node-schedule';
// import { ScheduleService } from './kakaoalim/kakaoalim.service';
import { MatchService } from './match/match.service';

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

  // let sendM002 = schedule.scheduleJob('00 20 * * *', () => {
  //   scheduleService.sendM002();
  //   scheduleService.sendM003();
  // });

  // let sendM007 = schedule.scheduleJob('00 09 * * *', () => {
  //   scheduleService.sendM006();
  //
  // });
}
bootstrap();
