import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Payload } from './dto/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // PassportStrategy를 상속받아 JwtStrategy 클래스를 정의. Strategy는 passport-jwt의 Strategy를 의미
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 요청에서 JWT를 추출하는 방법을 정의. 여기서는 Authorization 헤더의 Bearer 토큰에서 JWT를 추출
      ignoreExpiration: false, // 토큰의 만료를 무시할지 여부를 결정합니다. false로 설정하면 만료된 토큰은 거부
      secretOrKey: 'yourSecretKey', // JWT를 검증할 때 사용할 비밀키 또는 공개키를 지정. 실제 환경에서는 환경변수 등을 통해 관리하는 것이 좋음
    });
  }

  // Passport 전략에서 제공해야 하는 validate 메서드를 구현.
  // validate 메소드는 passport에 의해 자동으로 호출되며 JWT의 페이로드를 받아 유효성을 검사한 후 유효하다면 사용자 정보를 반환
  async validate(payload: Payload): Promise<any> {
    const user = this.authService.findUser(payload.username); // validate 메서드에서는 JWT의 페이로드를 받아 사용자를 찾아 반환

    if (!user) {
      throw new UnauthorizedException({ messeges: 'User Not Found' }); // 사용자가 없다면 UnauthorizedException을 발생
    }

    return payload; // 검증 후, 필요한 사용자 정보(여기서는 userId와 username)를 요청 객체에 주입할 수 있도록 반환
  }
}
