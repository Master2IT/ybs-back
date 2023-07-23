import { IsNotEmpty, IsString } from 'class-validator';

export class ColorsDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  value: string;
}
