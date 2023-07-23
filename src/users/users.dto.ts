import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
export class UpdateUserDto {
  @IsString()
  name: string;
  // @IsString()
  // password: string;
  @IsEmail()
  email: string;
  @IsEnum(['active', 'banned', 'disabled'])
  @IsString()
  @IsNotEmpty()
  status: 'active' | 'banned' | 'disabled';
  @IsNumber()
  shippingAddressId: number;
  @IsNumber()
  paymentInfoId: number;
  @IsArray()
  orderIds: number[];
  @IsArray()
  discountIds: number[];
  @IsArray()
  newsLetterIds?: number[];
  _id?: string;
}
