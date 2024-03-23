import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async signUp(userDto: UserDto) {
    const { username, password } = userDto;
    const findUser = await this.userRepository.findUser(username);

    if (findUser) {
      throw new Error('user already exists');
    }

    const _password = await this.hashToPassword(password);

    await this.userRepository.signUp(username, _password);

    return 'signup success';
  }

  async hashToPassword(password: string) {
    return await bcrypt.hashSync(password, 10);
  }

  async userList() {
    return this.userRepository.userList();
  }

  // 데이터베이스에 유저 정보가 있는지 확인 후 패스워드 정보만 제거한 뒤 클라이언트로 전달
  async userInfo(username: string) {
    const userInfo = await this.userRepository.userInfo(username);
    delete userInfo.password;
    return userInfo;
  }
}
