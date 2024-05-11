import { Posts } from 'src/posts/entities/posts.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { RolesEnum } from '../const/roles.const';
import { BaseModel } from 'src/common/entity/base.entity';
import { IsEmail, IsString, Length, MaxLength } from 'class-validator';
import { lengthValidationMessage } from 'src/common/validation-message/length-validation.message';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';
import { emailValidationMessage } from 'src/common/validation-message/email-validation.message';
import { Exclude, Expose } from 'class-transformer';
import { Chats } from 'src/chats/entity/chats.entity';
import { Messages } from 'src/chats/messages/entity/messages.entity';

@Entity()
export class Users extends BaseModel {
  // @PrimaryGeneratedColumn()
  // id: number;

  @Column({
    length: 20,
    unique: true,
  })
  @IsString({
    message: stringValidationMessage,
  })
  @Length(1, 20, {
    message: lengthValidationMessage,
  })
  @Expose()
  nickname: string;

  @Column({
    unique: true,
  })
  @IsString({
    message: stringValidationMessage,
  })
  @IsEmail(
    {},
    {
      message: emailValidationMessage,
    },
  )
  @Expose()
  email: string;

  @Column()
  @IsString({
    message: stringValidationMessage,
  })
  @MaxLength(20)
  @Exclude({
    toPlainOnly: true, // Response에는 password가 포함되지 않음
  })
  password: string;

  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @OneToMany(() => Posts, (post) => post.author)
  posts: Posts[];

  // @UpdateDateColumn()
  // updatedAt: Date;

  // @CreateDateColumn()
  // createdAt: Date;
  @ManyToMany(() => Chats, (chat) => chat.users)
  @JoinTable()
  chats: Chats[];

  @OneToMany(() => Messages, (message) => message.author)
  messages: Messages;
}
