import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

// 현재 req에는 header 부분 등 많은 데이터가 넘어오기 때문에 필요한 user 데이터만 보기위한 커스텀 데코레이터 생성
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    // 이 부분은 Request안에 유저 정보가 들어 있다는걸 전제로 하기 때문에 controller에서 UseGuard를 해주지 않으면 에러
    const req = ctx.switchToHttp().getRequest();
    return req.user;

    /* 
      결과
      user :  User {
        id: 6,
        username: 'test2',
        password: '$2a$10$dzxdUB8u7EJlRljROpvTR.Kn2LDSbOpO4Vq42L6TvOwYN9pfjoRxC'
}
    */
  },
);
