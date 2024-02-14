import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './boardStatus.enum';
import { CreateBoardDto } from './dto/createBoard.dto';
import { BoardStatusValidationPipe } from './pipes/boardStatusValidation.pipe';
import { Board } from './boards.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard()) // 컨트롤러 레벨의 guard를 설정하여 모든 핸들러에 적용
export class BoardsController {
  // BoardContorller에서 로그를 출력한다 라는 의미
  private logger = new Logger('BoardContorller');

  constructor(private boardsService: BoardsService) {}

  // ============== 데이터베이스를 활용한 게시판 연습 ==============

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Get('')
  getAllBoard(): Promise<Board[]> {
    this.logger.verbose(`Call method by getAllBoard`);
    return this.boardsService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User, // 게시물을 작성할때 유저의 정보도 같이 보내기 위해 설정
  ): Promise<Board> {
    // 누가 어떤 게시물을 만들었는지에 대한 로그를 남김
    this.logger.verbose(
      `User ${user.username} create a new board. Payload : ${JSON.stringify(createBoardDto)}`,
    );
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id,
    @GetUser() user: User, // 해당 게시물을 작성한 유저만 게시글을 지울 수 있게 하기 위해 추가
  ): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
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
