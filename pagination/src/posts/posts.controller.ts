import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaginatePostDto } from './dto/paginate-post.dto';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
  @Get()
  getPosts(@Query() query: PaginatePostDto) {
    return this.postsService.paginatePosts(query);
  }

  @Post()
  createPost(@Body() body: CreatePostDto) {
    return this.postsService.createPost(body);
  }

  @Post('generate')
  generatePosts() {
    return this.postsService.generatePosts();
  }
}
