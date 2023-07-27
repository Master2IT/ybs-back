import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewsDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  @IsInt()
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
