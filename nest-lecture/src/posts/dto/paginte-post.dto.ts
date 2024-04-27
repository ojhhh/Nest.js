import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { BasePaginationDto } from 'src/common/dto/base-pagination.dto';

export class PaginatePostDto extends BasePaginationDto {
  @IsNumber()
  @IsOptional()
  where__id__more_than: number;

  @IsNumber()
  @IsOptional()
  where__title_i_like: number;
}
