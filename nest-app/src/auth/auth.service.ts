import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Payload } from './dto/payload.interface';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    // 로그인 요청한 회원이 데이터베이스에 있는 회원인지 확인하는 로직
    const { username, password } = signInDto;
    const user = await this.userRepository.findUser(username);

    if (!user) {
      throw new UnauthorizedException({ messeges: 'User Not Found' });
    }

    // 가져온 회원 정보 중 패스워드가 맞는지 검증
    const compoarePassword = await this.compoarePassword(
      password,
      user.password,
    );

    if (!compoarePassword) {
      throw new UnauthorizedException({ messeges: 'Password Not Match' });
    }

    // 토큰 발급
    const payload: Payload = {
      id: user.id,
      username: user.username,
    };

    const accessToken = await this.jwtService.sign(payload);

    return { message: 'login success', accessToken };
  }

  // 입력받은 패스워드와 데이터베이스에 저장된 패스워드를 비교하는 메서드
  // bcrypt는 단방향 해싱 라이브러리기 때문에 boolean 타입으로 반환
  async compoarePassword(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, userPassword);
  }

  // 해당 유저가 있는지 확인
  async findUser(username: string) {
    return await this.userRepository.findUser(username);
  }
}
