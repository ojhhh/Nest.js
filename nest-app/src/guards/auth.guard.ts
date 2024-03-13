import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  // canActivate 는 Nestjs의 guard에서 필수적으로 구현해야 하는 메소드
  // 현재 요청이 계속 진행 될 수 있는지 여부를 반환
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // ExecutionContext를 통해 현재 요청에 대한 정보를 가져옴
    const request = context.switchToHttp().getRequest();
    
    // 요청 헤더에서 토큰을 가져옴
    // const token = request.headers['authorization'].split(' ')[1];

    // 현재는 테스트를 위해 더미 토큰을 사용
    const token = 'isToken';

    // this.validateToken(token) 메소드를 통해 토큰을 검증하고 결과를 반환해야하지만 현재는 간단한 테스트를 위해 더미 객체를 사용
    request.user = { user_id: 1, username: 'test', roles: ['user'] };    


    // 가져온 토큰을 검증
    return this.validateToken(token);
  }

  // 지금은 간단히 토큰의 유무만 판단하지만 보통 jwt를 활용하여 토큰을 검증함
  private validateToken(token: string): boolean {
    if(!token) return false;
    try {
      // 토큰 검증 로직
      // 토큰의 서명이 유효하고 만료되지 않았다면 true 반환
      return true;
    } catch (error) {
      // 토큰 검증 중 오류가 발생한 경우 false 반환
      return false;
    }
  }
}