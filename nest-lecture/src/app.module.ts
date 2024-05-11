import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Users } from './users/entities/users.entity';
import { Posts } from './posts/entities/posts.entity';
import { CommonModule } from './common/common.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import {
  ENV_DB_DATABASE_KEY,
  ENV_DB_HOST_KEY,
  ENV_DB_PASSWORD_KEY,
  ENV_DB_PORT_KEY,
  ENV_DB_USERNAME_KEY,
} from './common/const/env-keys.const';
import { public_FOLDER_PATH } from './common/const/path.const';
import { Images } from './common/entity/image.entity';
import { logMiddleWare } from './common/middleware/log.middleware';
import { ChatsModule } from './chats/chats.module';
import { Chats } from './chats/entity/chats.entity';
import { Messages } from './chats/messages/entity/messages.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env[ENV_DB_HOST_KEY],
      port: parseInt(process.env[ENV_DB_PORT_KEY]),
      username: process.env[ENV_DB_USERNAME_KEY],
      password: process.env[ENV_DB_PASSWORD_KEY],
      database: process.env[ENV_DB_DATABASE_KEY],
      entities: [Users, Posts, Images, Chats, Messages],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: public_FOLDER_PATH,
      serveRoot: '/public',
    }),
    PostsModule,
    AuthModule,
    UsersModule,
    CommonModule,
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR, // 앱 전체에 interceptor 적용
      useClass: ClassSerializerInterceptor,
    },
  ],
})
// 미들웨어는 모듈에 적용
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logMiddleWare).forRoutes({
      // path: 'posts', // 정확히 posts에만 적용
      path: '*', // posts 라우트에 모두 적용
      method: RequestMethod.ALL,
    });
  }
}
