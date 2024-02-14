import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const port = 3000;

  // default.yaml에 있는 설정을 불러옴
  const serverConfig = config.get('server');
  const port = serverConfig.port;

  await app.listen(port);
  // Logger 로그를 남겨주는 빌트인 되어 있는 모듈
  // 서버가 켜지면 로그를 출력
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
