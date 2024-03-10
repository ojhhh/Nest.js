import { Injectable } from '@nestjs/common';

// 해당 클래스를 서비스로 선언하는 데코레이터로 의존성 주입 시스템에서 이 클래스의 인스턴스를 관리
@Injectable()
export class AppService {
  // 비즈니스 로직
  getHello(): string {
    return 'Hello World!';
  }
}