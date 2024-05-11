import { BaseModel } from 'src/common/entity/base.entity';
import { Users } from 'src/users/entities/users.entity';
import { Entity, ManyToMany, OneToMany } from 'typeorm';
import { Messages } from '../messages/entity/messages.entity';

@Entity()
export class Chats extends BaseModel {
  @ManyToMany(() => Users, (user) => user.chats)
  users: Users[];

  @OneToMany(() => Messages, (message) => message.chat)
  messages: Messages;
}
