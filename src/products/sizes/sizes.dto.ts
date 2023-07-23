import { IsNotEmpty, IsString } from 'class-validator';

export class SizesDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  value: string;
}
