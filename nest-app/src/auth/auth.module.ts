import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: 'secretKey', // jwtService.sign에서 사용할 비밀키
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}

/*
 * 실수 1. providers에 JwtService 추가
 * jwtService.sign 과정에서 오류 발생
 * [Nest] 34383  - 03/22/2024, 7:46:27 PM   ERROR [ExceptionsHandler] secretOrPrivateKey must have a value
Error: secretOrPrivateKey must have a value
 * providers에 서비스를 등록하게 되면 새로운 인스턴스가 생성되기 때문에 그런거 같다
 */
