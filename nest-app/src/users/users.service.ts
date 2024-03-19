import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async signUp(userDto: UserDto) {
    return this.usersRepository.signUp(userDto);
  }

  async signIn(userDto: UserDto) {
    return this.usersRepository.signIn(userDto);
  }

  async userList() {
    return this.usersRepository.userList();
  }
}
