import { PickType } from '@nestjs/mapped-types';
import { Users } from 'src/users/entities/users.entity';

export class RegisterUserDto extends PickType(Users, [
  'nickname',
  'email',
  'password',
]) {}
