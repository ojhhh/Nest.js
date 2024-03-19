import { Controller, Get, Post, Put } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  allBoard(): Promise<string> {
    return this.boardService.allBoard();
  }

  @Get('/:id')
  getBoard(): Promise<string> {
    return this.boardService.getBoard();
  }

  @Post('/create')
  createBoard(): Promise<string> {
    return this.boardService.createBoard();
  }

  @Put('/delete')
  deleteBoard(): Promise<string> {
    return this.boardService.deleteBoard();
  }
}
