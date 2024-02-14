import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as config from 'config';

@Injectable()
// 만약 여러개의 설정이 필요한경우 PassportStrategy(Strategy)의 두번째 매개변수에 이름을 정해 줘야함
// ex) PassportStrategy(Strategy, 'jwtAccess)
//     PassportStrategy(Strategy, 'jwtRefresh)
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      // jwtFromRequest에 의해 토큰이 바로 추출
      // 현재 토큰의 타입은 Bearer을 사용하기 때문에 fromAuthHeaderAsBearerToken 메소드 사용
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // passport와 passport-jwt 라이브러리에 의해 secretOrKey 를 사용하여 토큰을 검증을 자동으로 처리
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
      // 토큰이 유효하면 페이로드를 디코드하고 validate 메소드에 전달
    });
  }

  // passport의 내부 동작 매커니즘에 의해 JwtStrategy가 호출되면 validate 메소드가 바로 실행
  async validate(payload) {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
