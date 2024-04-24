import { ClassSerializerInterceptor, Module } from '@nestjs/common';
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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Users, Posts],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: 'public/posts',
      serveRoot: '/public',
    }),
    PostsModule,
    AuthModule,
    UsersModule,
    CommonModule,
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
export class AppModule {}
