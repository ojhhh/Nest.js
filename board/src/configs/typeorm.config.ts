import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.HOSTNAME || dbConfig.host,
  port: process.env.DATABASE_PORT || dbConfig.port,
  username: process.env.DATABASE_USERNAME || dbConfig.username,
  password: process.env.DATABASE_PASSWORD || dbConfig.password,
  database: process.env.DATABASE_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: dbConfig.synchronize,
};
