import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { Users } from '../entities/users.entity';

export const User = createParamDecorator(
  (data: keyof Users | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    const user = req.user as Users;

    if (!user) {
      throw new InternalServerErrorException(
        'User not found in request object',
      );
    }

    if (data) {
      return user[data];
    }

    return user;
  },
);
