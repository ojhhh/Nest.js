import { PickType } from '@nestjs/mapped-types';
import { Messages } from '../entity/messages.entity';
import { IsNumber } from 'class-validator';

export class CreateMessagesDto extends PickType(Messages, ['message']) {
  @IsNumber()
  chatId: number;

  @IsNumber()
  authorId: number;
}
