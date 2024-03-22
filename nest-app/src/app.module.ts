import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { TypeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

// 이 클래스를 Nestjs 모듈로 선언하는 데코레이터
@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    UserModule,
    BoardModule,
    AuthModule,
  ], // 해당 모듈에서 사용할 다른 모듈을 나열
  controllers: [AppController], // 해당 모듈이 인식해야하는 컨트롤러를 나열
  providers: [AppService], // 해당 모듈에서 사용할 서비스를 나열
})
// NestModule 인터페이스를 구현하여 미들웨어를 적용
export class AppModule implements NestModule {
  // consumer는 미들웨어를 적용할 컨트롤러를 나타내는 객체
  configure(consumer: MiddlewareConsumer) {
    // 와일드 카드를 적용하여 모든 경로에 LoggerMiddleware를 적용
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
