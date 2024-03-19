import { In, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';

export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async signUp(userDto: UserDto): Promise<void> {
    console.log(userDto);
    console.log(this.usersRepository);
    const { username, password } = userDto;
    const user = await this.usersRepository.create({ username, password });
    await this.usersRepository.save(user);
  }

  async signIn(userDto: UserDto): Promise<string> {
    const { username, password } = userDto;
    const chk = await this.usersRepository.findOneBy({ username, password });
    if (chk) {
      return 'signin success';
    } else {
      return 'signin fail';
    }
  }

  async userList(): Promise<void> {
    const users = await this.usersRepository.find({
      select: ['username'],
    });
    console.log('?');
    console.log(users);
    // [ User { username: 'test' }, User { username: 'test1' } ]
    // return users;
  }
}
