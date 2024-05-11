import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatsService } from './chats.service';
import { EnterChatDto } from './dto/enter-chat.dto';
import { CreateMessagesDto } from './messages/dto/create-messages.dto';
import { ChatsMessagesService } from './messages/messages.service';

@WebSocketGateway({
  namespace: 'chats',
})
export class ChatsGateway implements OnGatewayConnection {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messageService: ChatsMessagesService,
  ) {}
  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {
    console.log(`on connect called: ${socket.id}`);
  }

  @SubscribeMessage('create_chat')
  async createChat(
    @MessageBody() data: CreateChatDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const chat = await this.chatsService.createChat(data);
  }

  @SubscribeMessage('enter_chat')
  async enterChat(
    @MessageBody() data: EnterChatDto,
    @ConnectedSocket() socket: Socket,
  ) {
    // for (const chatId of data) {
    //   socket.join(chatId.toString());
    // }
    for (const chatId of data.chatIds) {
      const exists = await this.chatsService.checkIfChatExists(chatId);
      // console.log(chatId);
      if (!exists)
        throw new WsException({
          code: 100,
          message: `존재하지 않는 chat 입니다. chatId: ${chatId}`,
        });
    }
    socket.join(data.chatIds.map((e) => e.toString()));
  }

  @SubscribeMessage('send_message')
  async sendMessage(
    @MessageBody() dto: CreateMessagesDto,
    @ConnectedSocket() socket: Socket,
  ) {
    // console.log(message);

    // 방 안에 있는 사람들만 통신
    // this.server
    //   .in(message.chatId.toString())
    //   .emit('receive_message', message.message);

    const chatExists = await this.chatsService.checkIfChatExists(dto.chatId);

    if (!chatExists)
      throw new WsException(
        `존재하지 않는 채팅방입니다. chat ID : ${dto.chatId}`,
      );

    const message = await this.messageService.createMessage(dto);
    // console.log('messages: ', message);
    // 메시지 브로드 캐스트
    socket
      .to(message.chat.id.toString())
      .emit('receive_message', message.message);
  }
}
