import { Type } from 'class-transformer';
import {
  IsAlpha,
  IsDateString,
  IsEmail,
  IsJSON,
  IsLatitude,
  IsLongitude,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';

class LocationDTO {
  @IsNumber()
  @IsLongitude()
  @Type(() => Number)
  longitude: number;

  @IsNumber()
  @IsLatitude()
  @Type(() => Number)
  latitude: number;
}

class ContactDto {
  @IsNumber()
  @Type(() => Number)
  telephone: number;
}

export class CreateRetailerDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  website: string;

  @IsOptional()
  @Type(() => ContactDto)
  contact_info: any;

  @IsOptional()
  @Type(() => LocationDTO)
  location: any;

  @IsOptional()
  @Type(() => LocationDTO)
  address: any;

  @IsNumber()
  average_rating: number;
}
