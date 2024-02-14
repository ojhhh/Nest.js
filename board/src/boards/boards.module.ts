import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './boards.entity';
import { BoardRepository } from './boards.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  // 인증관려 설정을 사용하기위해 AuthModule imports
  imports: [TypeOrmModule.forFeature([Board]), AuthModule],
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository],
})
export class BoardsModule {}
