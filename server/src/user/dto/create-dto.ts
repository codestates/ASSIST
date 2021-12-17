import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from 'class-validator';

enum GenderEnum {
  man = '남성',
  woman = '여성',
}

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
  @IsEnum(GenderEnum)
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
