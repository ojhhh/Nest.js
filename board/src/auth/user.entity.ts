import { Board } from 'src/boards/boards.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username']) // 같은 이름을 가진 유저가 있으면 에러 발생
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // 첫번째 매개변수는 타입을 정의
  // 두번째 매개변수는 접근 방법을 정의
  // 세번째 매개변수 eager: true 해당 정보를 가져올때 연결되어 있는 다른 엔티티도 가져옴
  // 한명의 유저가 여러개의 게시물을 생성할 수 있으니 oneToMany 관계
  @OneToMany((type) => Board, (board) => board.user, { eager: true })
  boards: Board[];
}
