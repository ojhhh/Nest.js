import { Injectable, NotFoundException } from '@nestjs/common';

interface Posts {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: Posts[] = [
  {
    id: 1,
    author: 'tester1',
    title: 'Hello World',
    content: 'Hello World',
    likeCount: 0,
    commentCount: 0,
  },
  {
    id: 2,
    author: 'tester2',
    title: 'Hello World',
    content: 'Hello World',
    likeCount: 0,
    commentCount: 0,
  },
  {
    id: 3,
    author: 'tester3',
    title: 'Hello World',
    content: 'Hello World',
    likeCount: 0,
    commentCount: 0,
  },
];

@Injectable()
export class PostsService {
  getPosts() {}

  getPostById(id: number) {
    const post = posts.find((post) => post.id === +id);

    if (!post) throw new NotFoundException('Post not found');
  }

  createPost() {}

  updatePost() {}

  deletePost() {}
}
