import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chats } from './entity/chats.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { Repository } from 'typeorm';
import { CommonService } from 'src/common/common.service';
import { PaginateChatDto } from './dto/paginate-chat.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chats)
    private readonly chatsRepository: Repository<Chats>,
    private readonly commonService: CommonService,
  ) {}

  paginateChats(dto: PaginateChatDto) {
    return this.commonService.paginate(
      dto,
      this.chatsRepository,
      {
        relations: {
          users: true,
        },
      },
      'chats',
    );
  }

  async createChat(dto: CreateChatDto) {
    const chat = await this.chatsRepository.save({
      users: dto.userIds.map((id) => ({ id })),
    });

    return this.chatsRepository.findOne({
      where: {
        id: chat.id,
      },
    });
  }

  async checkIfChatExists(chatId: number) {
    const exists = await this.chatsRepository.exists({
      where: {
        id: chatId,
      },
    });

    return exists;
  }
}
