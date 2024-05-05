import { Transform } from 'class-transformer';
import { join } from 'path';
import { POST_PUBLIC_IMAGE_PATH } from 'src/common/const/path.const';
import { BaseModel } from 'src/common/entity/base.entity';
import { Images } from 'src/common/entity/image.entity';
import { Users } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany((type) => Images, (image) => image.post)
  images?: Images[];
}
