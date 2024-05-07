import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';

export const QueryRunner = createParamDecorator(
  (data, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();

    if (!req.queryRunner) {
      throw new BadRequestException('QueryRunner is not initialized');
    }

    return req.queryRunner;
  },
);
