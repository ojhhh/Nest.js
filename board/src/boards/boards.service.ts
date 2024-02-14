import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boardStatus.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/createBoard.dto';
import { BoardRepository } from './boards.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './boards.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  // ============== 데이터베이스를 활용한 게시판 연습 ==============
  constructor(private boardRepository: BoardRepository) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getAllBoards();
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;

    await this.boardRepository.updateBoardStatus(board);
    return board;
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    return this.boardRepository.deleteBoard(id, user);
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    // const { title, description } = createBoardDto;
    // const board = this.boardRepository.create({
    //   title,
    //   description,
    //   status: BoardStatus.PUBLIC,
    // });

    // await this.boardRepository.save(board);
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async getBoardById(id: number): Promise<Board> {
    // Board는 entity에 정의된 클래스를 가져온것
    // const found = await this.boardRepository.findOne({ where: { id } });

    // if (!found) {
    //   throw new NotFoundException(`not found board ${id}`);
    // }

    return this.boardRepository.getBoardById(id);
  }
  // ============== 로컬 메모리를 활용한 게시판 연습 ==============
  // // 그냥 Board만 정의 하면 타입에러
  // // 배열 형태로 저장하기 때문에 그냥 Board가 아닌 Board[]로 정의
  // private boards: Board[] = [];
  // // : Board[] 는 return 되는 값이 배열이리 때문에 타입을 정의
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  // // createBoard(title: string, description: string) {
  // // dto를 활용하여 타입 정의
  // createBoard(createBoardDto: createBoardDto) {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title: title,
  //     description: description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   // 찾는 게시물이 없을때 에러
  //   if (!found) {
  //     throw new NotFoundException(`${id} Is Not Found`); // 해당 게시물이 없다면 에러 처리
  //   }
  //   return found;
  // }
  // deleteBoard(id: string): void {
  //   // id를 찾아서 id를 제외한 나머지를 저장
  //   const found = this.getBoardById(id); // 해당 게시물이 있는지 확인
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
