import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Min,
} from 'class-validator';

export class CreateDiscountDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsEnum(['percent', 'price'])
  @IsString()
  @IsNotEmpty()
  type: string;
  @IsNumber()
  @IsNotEmpty()
  count: number;
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  value: number;
}
