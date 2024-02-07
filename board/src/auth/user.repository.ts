import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/authCredential.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    // bcryptjs를 활용한 비밀번호 암호화
    // salt : 비밀번호에 임의의 salt 값을 생성하여 붙여 기존 비밀번호와 같이 hash
    const salt = await bcrypt.genSalt();
    // console.log('salt : ', salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log('hashedPassword : ', hashedPassword);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      // console.error(error);
      // 유저 이름이 겹쳤을때 error 코드를 찾아 중복된 아이디가 있을때 에러를 보냄
      if (error.code === '23505') {
        throw new ConflictException('Existring username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signUser(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'login success';
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
