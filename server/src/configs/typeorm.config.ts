import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST || dbConfig.host,
  port: parseInt(process.env.DATABASE_PORT || dbConfig.port),
  username: process.env.DATABASE_USERNAME || dbConfig.user,
  password: process.env.DATABASE_PASSWORD || dbConfig.password,
  database: 'assist',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
};
