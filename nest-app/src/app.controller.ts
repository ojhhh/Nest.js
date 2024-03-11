import { Controller, Get, HttpException, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './filter/http-exception.filter';

// 해당 클래스를 Nestjs 컨트롤러로 선언하는 데코레이터
// ()에 경로 정보가 들어가는데 아무것도 없으면 기본적으로 '/'로 인식
@Controller()
// controller scope : filter를 컨트롤러 전체에 적용
// @UseFilters(HttpExceptionFilter)
export class AppController {
  // 생성자 함수로 AppService를 해당 클래스에 private 멤버로 주입
  constructor(private readonly appService: AppService) {}

  // HTTP GET 요청을 처리하는 핸들러 메소드를 정의하는 데코레이터
  // Controller 데코레이터와 같이 아무것도 입력하지 않으면 기본적으로 '/'로 인식
  // @Post(), @Put(), @Delete() 등등 여러 데코레이터가 존재
  @Get()
  // 클라이언트로 부터 요청을 받으면 호출되는 메소드로 반환되는 값의 타입이 정의되어 있는 모습
  getHello(): string {
    // 주입된 AppServce의 getHello() 함수를 호출
    return this.appService.getHello();
  }

  @Get('/method-scope-test')
  // method scope : filter를 해당 메소드에만 적용
  @UseFilters(HttpExceptionFilter)
  MethodScopeTest() {
    throw new HttpException('Forbidden', 403);
  }
}