import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsEmail,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsNotEmpty()
  gender: string;
  @IsOptional()
  @IsString()
  provider?: string;
}

export class CreateSMSAuth {
  @IsString()
  @IsNotEmpty()
  phone: string;
  @IsString()
  @IsNotEmpty()
  number: string;
}
