import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateSubCategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsObject()
  @IsNotEmpty()
  image: {
    src: string;
    alt: string;
  };
  @IsString()
  @IsNotEmpty()
  categoryId: string;
  categories: string[];
}
