import { FindManyOptions } from 'typeorm';
import { Posts } from '../entities/posts.entity';

export const DEFAULT_POST_FIND_OPTIONS: FindManyOptions<Posts> = {
  relations: {
    author: true,
    images: true,
  },
};
