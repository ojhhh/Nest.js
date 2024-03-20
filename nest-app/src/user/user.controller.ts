import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  async signUp(@Body() userDto: UserDto): Promise<string> {
    return this.userService.signUp(userDto);
  }

  @Get('/signin')
  async singIn(@Query() userDto: UserDto): Promise<string> {
    return this.userService.signIn(userDto);
  }

  @Get('/list')
  async userList(): Promise<User[]> {
    return this.userService.userList();
  }
}
