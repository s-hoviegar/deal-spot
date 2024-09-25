import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreatePricingDto {
  @IsNumber()
  @Type(() => Number)
  product_id: number;

  @IsNumber()
  @Type(() => Number)
  retailer_id: number;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsString()
  currency: string;

  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true || value === 1)
  sale: boolean;

  @IsString()
  availability: string;
}
