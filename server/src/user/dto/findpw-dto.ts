import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class FindpwDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsNumber()
  number: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
