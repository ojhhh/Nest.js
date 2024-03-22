import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Roles 데코레이터를 사용해 역할을 가져옴
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // 설정된 역할이 없는 경우, 모든 사용자가 접근할 수 있도록 true를 반환
    if (!roles) return true;

    // ExecutionContext를 통해 현재 HTTP 요청 객체를 가져옴
    // const request = context.switchToHttp().getRequest();
    // const user = request.user;


    // 현재는 간단한 테스트를 위해 더미 객체를 사용
    const user = { user_id: 1, username: 'test', roles: ['admin'] };


    // 사용자가 요청한 역할이 필요한 역할 중 하나인지 확인
    return roles.some((role) => user.roles?.includes(role));
  }
}
