// http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
// express 프레임워크에서 사용했던 Request, Response 객체의 타입
import { Request, Response } from 'express';

// 해당 데코레이터는 HttpException 예외와 그 서브 클래스의 예외를 캐치하여 처리하도록 클래스 지정
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // 예외가 발생했을때 호출될 메소드로 예외 객체와 요청의 컨텍스트를 인자로 받음
  catch(exception: HttpException, host: ArgumentsHost) {
    // HTTP 기반의 요청 컨텍스트를 가져와 Request와 Response 객체에 접근
    const ctx = host.switchToHttp();
    // 가져온 컨텍스트에서 Reponse 객체를 가져옴
    const response = ctx.getResponse<Response>();
    // 가져온 컨텍스트에서 Request 객체를 가져옴
    const request = ctx.getRequest<Request>();
    // HTTP 상태 코드를 가져옴
    const status = exception.getStatus();

    response
      .status(status) // 응답에 상태 코드를 설정
      .json({ // JSON 형식으로 반환
        statusCode: status, // 예외 상태 코드
        timestamp: new Date().toISOString(), // 현재 시각
        path: request.url, // 요청된 URL 경로
      });
  }
}