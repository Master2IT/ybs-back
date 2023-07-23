import { IsEmail } from 'class-validator';

export class subscribersDto {
  @IsEmail()
  email: string;
}
