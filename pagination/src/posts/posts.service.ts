import { Injectable } from '@nestjs/common';
import { PostsRepository } from './repositories/posts.repository';
import { PaginatePostDto } from './dto/paginate-post.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private postsRepository: PostsRepository) {}

  // getAllPosts() {
  //   return this.postsRepository.find();
  // }

  // 오름 차순으로 정렬된 게시물을 반환
  async paginatePosts(dto: PaginatePostDto) {
    const posts = await this.postsRepository.paginatePosts(dto);

    const lastItem =
      posts.length > 0 && posts.length === dto.take
        ? posts[posts.length - 1]
        : null;

    const nextURL = lastItem && new URL('http://localhost:3000/posts');

    if (nextURL) {
      /**
       * dto에 키값을 루핑하면서 키값에 해당되는 값이 존재하면 param에 그대로 붙여넣습니다
       * 단 where__id_more_than 값만 lastItem의 마지막 값으로 넣어줍니다
       */
      for (const key of Object.keys(dto)) {
        if (dto[key]) {
          if (key !== 'where__id_more_than' && key !== 'where__id_less_than') {
            nextURL.searchParams.append(key, dto[key]);
          }
        }
      }

      let key =
        dto.order__createdAt === 'ASC'
          ? 'where__id_more_than'
          : 'where__id_less_than';

      nextURL.searchParams.append(key, lastItem?.id.toString());
    }

    /**
     * Response
     *
     * data: Date[],
     * cursor: {
     *  after: 마지막 Data의 ID
     * count : 응답한 데이터의 갯수
     * next: 다음 요청을 할때 사용할 URL
     */

    return {
      data: posts,
      cursor: {
        after: lastItem?.id,
      },
      count: posts.length,
      next: nextURL?.toString(),
    };
    // 해당 되는 게시물이 0개 이상이면 마지막 게시물을 가져오고 아니면 null을 반환
  }

  async createPost(dto: CreatePostDto) {
    return this.postsRepository.createPost(dto);
  }

  // 임의의 100개의 게시물 생성
  async generatePosts() {
    for (let i = 0; i < 100; i++) {
      await this.postsRepository.createPost({
        title: `title ${i}`,
        content: `content ${i}`,
      });
    }
  }
}
