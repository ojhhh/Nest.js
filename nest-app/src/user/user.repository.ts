import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 회원가입
  async signUp(username: string, password: string): Promise<string> {
    const user = await this.userRepository.create({ username, password });
    await this.userRepository.save(user);
    return 'signup success';
  }

  // 로그인
  // async signIn(userDto: UserDto): Promise<string> {
  //   const { username, password } = userDto;
  //   const userCheck = await this.userRepository.findOneBy({
  //     username,
  //     password,
  //   });
  //   if (userCheck) {
  //     return 'signin success';
  //   } else {
  //     return 'signin fail';
  //   }
  // }

  // 같은 유저명을 가진 유저가 있는지 확인
  async findUser(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  // 회원가입된 유저 리스트
  async userList(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['username'],
    });
  }

  // 유저 정보
  async getUserInfo(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ username });
  }
}
