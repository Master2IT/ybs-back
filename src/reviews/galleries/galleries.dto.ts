import { IsNotEmpty, IsString } from 'class-validator';

export class ReviewGalleriesDto {
  @IsNotEmpty()
  @IsString()
  reviewId: string;
}
