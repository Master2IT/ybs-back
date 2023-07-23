import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsObject()
  @IsNotEmpty()
  image: {
    src: string;
    alt: string;
  };
  // @IsString()
  // @IsNotEmpty()
  // subCategoryId: string;
}
