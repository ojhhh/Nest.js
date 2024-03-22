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

  async getUserInfo(username: string) {
    const userInfo = await this.userRepository.getUserInfo(username);
    delete userInfo.password;
    return userInfo;
  }
}
