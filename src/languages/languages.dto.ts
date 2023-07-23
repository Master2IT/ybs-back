import { IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class LanguageDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  lang: string;
  @IsString()
  @IsNotEmpty()
  domain: string;
  @IsObject()
  @IsNotEmpty()
  currency: {
    name: 'euro' | 'dollar';
    iso: 'EUR' | 'USD';
  };
}
