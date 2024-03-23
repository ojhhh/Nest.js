import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// Request 요청에서 유저정보만 가져오기 위한 커스텀 데코레이터 작성
export const UserInfo = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const user = request.user;

    return user ? user.username : undefined;
  },
);
