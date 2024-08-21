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

export class CreateUserDto {
  @IsAlpha()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password_hash: string;

  @IsOptional()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => LocationDTO)
  location: any;

  @IsOptional()
  @IsNotEmptyObject()
  @IsObject()
  detail: any;

  @IsDateString()
  last_login: Date;
}

export class UpdateUserDto {
  @IsOptional()
  @IsAlpha()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsStrongPassword()
  password_hash: string;

  @IsOptional()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => LocationDTO)
  location: any;

  @IsOptional()
  @IsNotEmptyObject()
  @IsObject()
  detail: any;
}
