import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
  ) {}

  async findUser(username: string) {
    return this.authRepository.findOneBy({ username });
  }
}
