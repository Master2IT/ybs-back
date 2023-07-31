import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ReviewReactionsDto {
  @IsNotEmpty()
  @IsString()
  reviewId: string;
  @IsBoolean()
  reaction: boolean;
}
