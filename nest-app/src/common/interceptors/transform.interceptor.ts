// transform.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs'; // rxjs 라이브러리에서 Observable을 가져옴
import { map } from 'rxjs/operators'; // rxjs 라이브러리에서 map 연산자를 가져옴

// 여기서 T는 제네릭 타입으로, 어떤 타입이든 받을 수 있도록 정의
// 반환되는 데이터의 타입을 Response<T>로 정의
export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  // ExecutionContext는 현재 실행 컨텍스트에 대한 정보를 제공하는 인터페이스
  // CallHandler는 핸들러 메소드를 호출하는 데 사용되는 인터페이스
  // Observable은 비동기적으로 값을 반환하는데 사용되는 인터페이스
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    // next.handle()은 핸들러 메소드를 호출하고 반환된 결과를 Observable로 반환
    // map 연산자는 반환된 데이터를 가공하는데 사용
    // 여기서는 반환된 데이터를 { data: 반환된 데이터 }로 가공
    return next.handle().pipe(map(data => ({ data })));
  }
}