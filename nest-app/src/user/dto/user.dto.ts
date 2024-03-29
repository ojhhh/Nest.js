import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;
}
