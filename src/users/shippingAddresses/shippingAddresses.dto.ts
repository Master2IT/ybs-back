import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ShippingAddressesDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsNumber()
  @IsNotEmpty()
  countryId: number;
  @IsNumber()
  @IsNotEmpty()
  cityId: number;
  @IsString()
  @IsNotEmpty()
  state: string;
  @IsNumber()
  @IsNotEmpty()
  postalCode: number;
  @IsString()
  @IsNotEmpty()
  addressLine1: string;
  @IsString()
  @IsNotEmpty()
  addressLine2: string;
  @IsString()
  @IsNotEmpty()
  phone: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  userId: string;
  isDefault: boolean;
}

export class UpdateShippingAddressesDto {
  @IsNotEmpty()
  id: string;
  @IsString()
  name: string;
  @IsString()
  lastName: string;
  @IsNumber()
  countryId: number;
  @IsNumber()
  cityId: number;
  @IsString()
  state: string;
  @IsNumber()
  postalCode: number;
  @IsString()
  @IsNotEmpty()
  addressLine1: string;
  @IsString()
  @IsNotEmpty()
  addressLine2: string;
  @IsString()
  phone: string;
  @IsString()
  email: string;
  @IsString()
  userId: string;
  @IsBoolean()
  isDefault: boolean;
}
