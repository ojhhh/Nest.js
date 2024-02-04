import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './boardStatus.enum';
import { createBoardDto } from './dto/createBoard.dto';
import { BoardStatusValidationPipe } from './pipes/boardStatusValidation.pipe';
import { Board } from './boards.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  // ============== 데이터베이스를 활용한 게시판 연습 ==============

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }
  // ============== 로컬 메모리를 활용한 게시판 연습 ==============
  // @Get() // router.get('/',()=>{})
  // getAllBoard(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }

  // @Post() // router.post('/',(req, res)=> {})
  // @UsePipes(ValidationPipe) // handler leve pipes
  // // createBoard(
  // //   @Body('title') title: string,
  // //   @Body('description') description: string,
  // // ): Board {
  // //   return this.boardsService.createBoard(title, description);
  // // }

  // // dto를 사용하여 데이터 타입 정의
  // createBoard(@Body() createBoardDto: createBoardDto): Board {
  //   return this.boardsService.createBoard(createBoardDto);
  // }

  // // 특정 게시물만 가져오기
  // @Get('/:id')
  // getBoardByid(@Param('id') id: string): Board {
  //   return this.boardsService.getBoardById(id);
  // }

  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardsService.deleteBoard(id);
  // }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ) {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}
