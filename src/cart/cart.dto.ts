import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CartDto {
  @IsString()
  @IsNotEmpty()
  productId: string;
  @IsObject()
  @IsNotEmpty()
  color: object;
  @IsObject()
  @IsNotEmpty()
  size: object;
  @IsNumber()
  @IsNotEmpty()
  count: number;
}
