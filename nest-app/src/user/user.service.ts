import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async signUp(userDto: UserDto) {
    const { username, password } = userDto;
    const findUser = await this.userRepository.findUser(username);

    if (findUser) {
      throw new Error('user already exists');
    } else {
      return this.userRepository.signUp(userDto);
    }
  }

  async signIn(userDto: UserDto) {
    return this.userRepository.signIn(userDto);
  }

  async userList() {
    return this.userRepository.userList();
  }
}
