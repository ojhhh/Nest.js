import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

type payload = {
  id: number;
  username: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // PassportStrategy를 상속받아 JwtStrategy 클래스를 정의합니다. Strategy는 passport-jwt의 Strategy를 의미합니다.
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 요청에서 JWT를 추출하는 방법을 정의합니다. 여기서는 Authorization 헤더의 Bearer 토큰에서 JWT를 추출
      ignoreExpiration: false, // 토큰의 만료를 무시할지 여부를 결정합니다. false로 설정하면 만료된 토큰은 거부
      secretOrKey: 'yourSecretKey', // JWT를 검증할 때 사용할 비밀키 또는 공개키를 지정합니다. 실제 환경에서는 환경변수 등을 통해 관리하는 것이 좋음
    });
  }

  async validate(payload: payload) {
    // Passport 전략에서 제공해야 하는 validate 메서드를 구현합니다. 토큰이 유효한 경우 호출되며, 페이로드는 검증된 JWT의 내용
    return { id: payload.id, username: payload.username }; // 검증 후, 필요한 사용자 정보(여기서는 userId와 username)를 요청 객체에 주입할 수 있도록 반환
  }
}
