import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  async allBoard(): Promise<string> {
    return '게시판 목록';
  }

  async getBoard(): Promise<string> {
    return '게시판 상세';
  }

  async createBoard() {
    return '게시판 생성';
  }

  async deleteBoard() {
    return '게시판 삭제';
  }
}
