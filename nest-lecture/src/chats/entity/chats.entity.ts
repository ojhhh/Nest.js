import { BaseModel } from 'src/common/entity/base.entity';
import { Users } from 'src/users/entities/users.entity';
import { Entity, ManyToMany } from 'typeorm';

@Entity()
export class Chats extends BaseModel {
  @ManyToMany(() => Users, (user) => user.chats)
  users: Users[];
}
