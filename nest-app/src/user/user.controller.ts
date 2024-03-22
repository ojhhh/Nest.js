import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserInfo } from 'src/common/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  async signUp(@Body() userDto: UserDto): Promise<string> {
    return this.userService.signUp(userDto);
  }

  // @Get('/signin')
  // async singIn(@Query() userDto: UserDto): Promise<string> {
  //   return this.userService.signIn(userDto);
  // }

  @Get('/list')
  async userList(): Promise<User[]> {
    return this.userService.userList();
  }

  @Get('/userinfo')
  @UseGuards(AuthGuard)
  async userInfo(@UserInfo() username: string): Promise<any> {
    return this.userService.getUserInfo(username);
  }
}
