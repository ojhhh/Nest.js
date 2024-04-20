import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.getPosts();
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postsService.getPostById(+id);
  }

  @Post(':id')
  postPosts(@Param('id') id: string) {
    return this.postsService.createPost();
  }

  @Put(':id')
  putPost(@Param('id') id: string) {
    return this.postsService.updatePost();
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost();
  }
}
