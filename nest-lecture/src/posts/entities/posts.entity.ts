import { BaseModel } from 'src/common/entity/base.entity';
import { Users } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Posts extends BaseModel {
  // @PrimaryGeneratedColumn()
  // id: number;

  @ManyToOne(() => Users, (user) => user.posts, {
    nullable: false,
  })
  author: Users;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}
