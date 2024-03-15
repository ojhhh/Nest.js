import {
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Req,
  SetMetadata,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './guards/roles.decorator';
import { TransformInterceptor } from './interceptors/transform.interceptor';

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

  @Get('/pipe-test/:id')
  // 해당 controller의 모든 핸들러 메소드에 ParseIntPipe를 적용
  @UsePipes(new ParseIntPipe())
  PipeTest(
    // ParseIntPipe를 적용하지 않으면 기본적으로 id는 string
    // id: number을 선언해줘도 ParseIntPipe를 적용하지 않으면 string으로 인식
    // 왜냐하면 express에서는 모든 파라미터가 string으로 인식되기 때문
    @Param('id', ParseIntPipe) id: number,
  ) {
    return typeof id; // number
  }

  @Get('/auth-guard-test')
  @UseGuards(AuthGuard)
  authGuardTest(
    // request 객체를 가져오기 위해 @Req() 데코레이터 사용
    // AuthGuard를 통과하게 된 결과를 가져오기 위해 사용
    @Req() request: any,
  ) {
    // request 객체에 user 객체를 추가했기 때문에 사용 가능
    const user = request.user;
    return user;
  }

  @Get('/role-guard-test')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user') // 어떤 역할이 접근 가능한지 설정
  roleGuardTest(
    // request 객체를 가져오기 위해 @Req() 데코레이터 사용
    // RolesGuard를 통과하게 된 결과를 가져오기 위해 사용
    @Req() request: any,
  ) {
    const user = request.user;
    return user;
  }

  @Get('/transform-interceptor-test')
  @UseInterceptors(TransformInterceptor) // Method scope에 TransformInterceptor를 적용
  transformTest(): string {
    return 'transform test';
  }

  @Get('/logger-middleware-test')
  loggerMiddlewareTest(): void {
    console.log('미들웨어 통과 하고 비즈니스 로직 수행 중!');
    return console.log('비즈니스 로직 수행 완료!');
  }
}
