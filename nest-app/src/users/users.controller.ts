import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async signUp(@Body() userDto: UserDto): Promise<void> {
    return this.usersService.signUp(userDto);
  }

  @Get('/signin')
  async singIn(@Query() userDto: UserDto): Promise<string> {
    return this.usersService.signIn(userDto);
  }

  @Get('/list')
  async userList(): Promise<void> {
    return this.usersService.userList();
  }
}
