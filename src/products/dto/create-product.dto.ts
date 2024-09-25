import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  detail: string;

  @IsNumber()
  @Type(() => Number)
  category_id: number;
}
