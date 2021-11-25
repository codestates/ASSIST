import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  @IsString()
  provider: string;
}
