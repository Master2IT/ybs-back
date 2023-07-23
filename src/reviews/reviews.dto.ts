import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateReviewsDto {
  @IsNumber()
  @IsNotEmpty()
  rate: number;
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsBoolean()
  recommend: boolean;
  @IsString()
  @IsOptional()
  galleriesId: string;
  @IsString()
  @IsNotEmpty()
  productId: string;
}

export class ReviewsDto {
  _id: string;
  rate: number;
  title: string;
  description: string;
  recommend: boolean;
  updatedAt: string;
  createdAt: string;
}
