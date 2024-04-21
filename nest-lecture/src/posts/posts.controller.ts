import {
  Body,
  Controller,
  Delete,
  Get,
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
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postsService.getPostById(+id);
  }

  @Post()
  postPosts(@Body('authorId') authorId: number, @Body() body: any) {
    return this.postsService.createPost(authorId, body);
  }

  @Put(':id')
  putPost(@Param('id') id: number, @Body() body: any) {
    return this.postsService.updatePost(id, body);
  }

  @Delete(':id')
  deletePost(@Param('id') id: number) {
    return this.postsService.deletePost(id);
  }
}
