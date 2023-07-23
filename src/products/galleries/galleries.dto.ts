import { IsNotEmpty, IsString } from 'class-validator';

export class GalleriesDto {
  @IsNotEmpty()
  @IsString()
  alt: string;
  @IsNotEmpty()
  @IsString()
  productId: string;
}
