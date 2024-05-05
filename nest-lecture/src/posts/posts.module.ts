import { BadRequestException, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entities/posts.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';
import { UsersModule } from 'src/users/users.module';
import { Images } from 'src/common/entity/image.entity';
import { PostsImagesService } from './image/images.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Posts, Images]),
    AuthModule,
    CommonModule,
    UsersModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsImagesService],
})
export class PostsModule {}
