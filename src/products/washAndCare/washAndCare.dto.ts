import { IsNotEmpty, IsString } from 'class-validator';

export class WashAndCareDto {
  @IsNotEmpty()
  @IsString()
  description: string;
}
