import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  categoryId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @ApiProperty()
  @IsString()
  @Optional()
  discountId: string;
  @ApiProperty()
  @IsNumber()
  quantity: number;
  @ApiProperty()
  @IsObject()
  description: {
    longDesc: string;
    shortDesc: string;
  };
  @ApiProperty()
  @IsString()
  @Optional()
  skuId: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  languageId: string;
  @ApiProperty()
  @IsString()
  @Optional()
  tagIds: string[];
  @ApiProperty()
  @IsObject()
  attributes: {
    sizeIds: number[];
    colorIds: number[];
  };
  // @ApiProperty()
  // @IsString()
  // @Optional()
  // reviewId: string;
  @ApiProperty()
  @IsString()
  @Optional()
  washAndCareId: string;
  status: 'active' | 'pending' | 'disable';
  updatedAt: Date;
  createdAt: Date;
}
