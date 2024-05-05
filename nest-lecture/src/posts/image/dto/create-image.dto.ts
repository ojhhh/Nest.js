import { PickType } from '@nestjs/mapped-types';
import { Images } from 'src/common/entity/image.entity';

export class CreatePostImageDto extends PickType(Images, [
  'order',
  'type',
  'path',
  'post',
] as const) {}
