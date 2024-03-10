import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 이 클래스를 Nestjs 모듈로 선언하는 데코레이터
@Module({
  imports: [], // 해당 모듈에서 사용할 다른 모듈을 나열
  controllers: [AppController], // 해당 모듈이 인식해야하는 컨트롤러를 나열
  providers: [AppService], // 해당 모듈에서 사용할 서비스를 나열
})
export class AppModule {}