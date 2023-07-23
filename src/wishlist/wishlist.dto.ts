import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class WishlistDto {
  @IsArray()
  productIds: number[];
  @IsArray()
  categoryIds: number[];
  @IsArray()
  tagIds: number[];
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
