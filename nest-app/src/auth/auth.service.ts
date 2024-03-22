import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    // 로그인 요청한 회원이 데이터베이스에 있는 회원인지 확인하는 로직
    const { username, password } = signInDto;
    const user = await this.authRepository.findUser(username);

    if (!user) {
      throw Error('user not found');
    }

    // 가져온 회원 정보 중 패스워드가 맞는지 검증
    const compoarePassword = await this.compoarePassword(
      password,
      user.password,
    );

    if (!compoarePassword) {
      throw Error('password not match');
    }

    // 토큰 발급
    const payload = {
      id: user.id,
      username: user.username,
    };

    const accessToken = await this.jwtService.sign(payload);

    return { message: 'login success', accessToken };
  }

  async compoarePassword(
    password: string,
    userPassword: string,
  ): Promise<string> {
    return await bcrypt.compare(password, userPassword);
  }
}
