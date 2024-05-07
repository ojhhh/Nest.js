import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, observable, tap } from 'rxjs';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const path = req.originalUrl;

    const now = new Date();

    console.log(`[REQ] ${path} ${now.toLocaleString('kr')}`);

    return next.handle().pipe(
      tap((observable) =>
        console.log(
          `[RES] ${path} ${new Date().toLocaleString('kr')} ${new Date().getMilliseconds() - now.getMilliseconds()}`,
        ),
      ), // tab(): 순차적으로 실행
      // map(): 응답객체 변형
      // map((observable) => {
      //   return {
      //     message: 'success',
      //     response: observable,
      //   };
      // }),
    );
  }
}
