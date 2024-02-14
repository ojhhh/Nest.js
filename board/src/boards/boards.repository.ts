import { Repository } from 'typeorm';
import { Board } from './boards.entity';
import { CreateBoardDto } from './dto/createBoard.dto';
import { BoardStatus } from './boardStatus.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardRepository {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async updateBoardStatus(board: Board): Promise<void> {
    await this.boardRepository.save(board);
  }

  async deleteBoard(id: number, user: User): Promise<any> {
    const result = await this.boardRepository.delete({ id, user });

    if (!result.affected) {
      throw new NotFoundException(`can't find Board id ${id}`);
    }
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user: user,
    });
    await this.boardRepository.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`not found board ${id}`);
    }

    return found;
  }
}
