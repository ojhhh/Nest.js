import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';

export class PaginatePostDto {
  // @Type(() => Number)
  @IsNumber()
  @IsOptional()
  where__id_more_than?: number;

  @IsNumber()
  @IsOptional()
  where__id_less_than?: number;

  @IsIn(['ASC', 'DESC']) // 리스트에 있는 값만 허용
  @IsOptional()
  order__createdAt: 'ASC' | 'DESC' = 'ASC';

  @IsNumber()
  @IsOptional()
  take: number = 20;
}
