import { EntityRepository, Repository } from 'typeorm';
import { Board } from './boards.entity';
import { CreateBoardDto } from './dto/createBoard.dto';
import { BoardStatus } from './boardStatus.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    await this.save(board);
    return board;
  }
}
