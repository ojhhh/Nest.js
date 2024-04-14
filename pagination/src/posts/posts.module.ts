import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './repositories/posts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entities/posts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posts])],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}
