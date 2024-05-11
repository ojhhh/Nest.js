import { IsString } from 'class-validator';
import { Chats } from 'src/chats/entity/chats.entity';
import { BaseModel } from 'src/common/entity/base.entity';
import { Users } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Messages extends BaseModel {
  @ManyToOne(() => Chats, (chat) => chat.messages)
  chat: Chats;

  @ManyToOne(() => Users, (user) => user.messages)
  author: Users;

  @Column()
  @IsString()
  message: string;
}
