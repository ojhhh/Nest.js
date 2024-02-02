import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';
import { createBoardDto } from './dto/createBoard.dto';

@Injectable()
export class BoardsService {
  // 그냥 Board만 정의 하면 타입에러
  // 배열 형태로 저장하기 때문에 그냥 Board가 아닌 Board[]로 정의
  private boards: Board[] = [];

  // : Board[] 는 return 되는 값이 배열이리 때문에 타입을 정의
  getAllBoards(): Board[] {
    return this.boards;
  }

  // createBoard(title: string, description: string) {
  // dto를 활용하여 타입 정의
  createBoard(createBoardDto: createBoardDto) {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title: title,
      description: description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    const found = this.boards.find((board) => board.id === id);

    // 찾는 게시물이 없을때 에러
    if (!found) {
      throw new NotFoundException(`${id} Is Not Found`); // 해당 게시물이 없다면 에러 처리
    }

    return found;
  }

  deleteBoard(id: string): void {
    // id를 찾아서 id를 제외한 나머지를 저장
    const found = this.getBoardById(id); // 해당 게시물이 있는지 확인
    this.boards = this.boards.filter((board) => board.id !== found.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
