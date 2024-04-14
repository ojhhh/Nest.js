import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // transform: true 옵션을 추가하여 요청의 파라미터를 자동으로 변환하도록 설정합니다.
  // transform true 설정을 함으로써 dto에서 number로 선언한 값이 string으로 들어오더라도 자동으로 number로 변환됩니다.
  // ex) dto에서 number로 선언한 값이 string으로 들어오면 자동으로 number로 변환됩니다.
  // 또 dto에서 정한 기본값이 들어오지 않았을 경우 기본값으로 설정됩니다.
  // ex) dto에서 기본값을 10으로 설정했는데 들어오지 않았을 경우 10으로 설정됩니다.

  // transformOptions: { enableImplicitConversion: true } 옵션을 추가하여 암시적 변환을 활성화합니다.
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.listen(3000);
}
bootstrap();
