import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';

// 애플리케이션을 시작하는 비동기 함수
async function bootstrap() {
  // NestFactory를 사용해 AppModule를 기반으로 인스턴스를 생성
  const app = await NestFactory.create(AppModule);
  
  // 전역 필터를 적용
  // app.useGlobalFilters(new HttpExceptionFilter());
  // 전역 파이프를 적용
  // app.useGlobalPipes(new ValidationPipe());
  // 전역 auth 가드를 적용
  // app.useGlobalGuards(new AuthGuard());
  // 전역 role 가드를 적용
  // app.useGlobalGuards(new RolesGuard());

  // 생성된 애플리케이션을 리스닝하도록 설정
  // 기본적으로 3000포트로 설정
  await app.listen(3000);
}
bootstrap();