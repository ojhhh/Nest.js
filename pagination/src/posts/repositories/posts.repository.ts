import { FindOptionsWhere, LessThan, MoreThan, Repository } from 'typeorm';
import { Posts } from '../entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { PaginatePostDto } from '../dto/paginate-post.dto';
import { CreatePostDto } from '../dto/create-post.dto';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
  ) {}

  async createPost(dto: CreatePostDto) {
    return this.postsRepository.save({ ...dto });
  }

  async paginatePosts(dto: PaginatePostDto) {
    const where: FindOptionsWhere<Posts> = {};

    if (dto.where__id_less_than) {
      where.id = LessThan(dto.where__id_less_than);
    } else if (dto.where__id_more_than) {
      where.id = MoreThan(dto.where__id_more_than);
    }

    const posts = await this.postsRepository.find({
      where,
      order: {
        createdAt: dto.order__createdAt,
      },
      take: dto.take,
    });

    return posts;
  }
}
