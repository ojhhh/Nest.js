import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { BaseModel } from './base.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { POST_IMAGE_PATH, POST_PUBLIC_IMAGE_PATH } from '../const/path.const';
import { Transform } from 'class-transformer';
import { join } from 'path';
import { Posts } from 'src/posts/entities/posts.entity';

export enum ImageModelType {
  POST_IMAGE,
}

@Entity()
export class Images extends BaseModel {
  @Column({
    default: 0,
  })
  @IsInt()
  @IsOptional()
  order: number;

  @Column({
    enum: ImageModelType,
  })
  @IsEnum(ImageModelType)
  @IsString()
  type: ImageModelType;

  @Column()
  @IsString()
  @Transform(({ value, obj }) => {
    if (obj.type == ImageModelType.POST_IMAGE) {
      return `/${join(POST_PUBLIC_IMAGE_PATH, value)}`;
    } else {
      return value;
    }
  })
  path: string;

  @ManyToOne((type) => Posts, (post) => post.images)
  post?: Posts;
}
