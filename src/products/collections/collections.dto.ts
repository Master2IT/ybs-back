import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CollectionsDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsArray()
  productIds: string[];
  @IsString()
  @IsOptional()
  image: string;
}
