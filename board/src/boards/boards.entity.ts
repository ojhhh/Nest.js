import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardStatus } from './boardStatus.enum';
import { User } from 'src/auth/user.entity';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  // 하나의 유저가 게시물을 여러개 만들 수 있으니 ManyToOne 관계
  @ManyToOne((type) => User, (user) => user.boards, { eager: false })
  user: User;
}
