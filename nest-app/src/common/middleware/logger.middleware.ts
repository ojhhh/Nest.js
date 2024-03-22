import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // use 메소드는 모든 미들웨어에서 필수적으로 구현해야 하는 메소드
  // 요청과 응답을 조작하는 로직을 작성
  use(req: Request, res: Response, next: NextFunction) {
    console.log('미들웨어에서 요청 처리하는 중!');
    next();
  }
}
