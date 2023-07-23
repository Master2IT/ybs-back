import {
  IS_NOT_EMPTY,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class LoginPhoneDto {
  @IsPhoneNumber()
  phone: string;
}

export class LoginEmailDto {
  @IsEmail()
  email: string;
}
export class LoginAdminDto {
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CheckCodeDto {
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
  @IsNotEmpty()
  code: number | string;
}
