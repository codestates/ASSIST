import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class KaKaoDto {
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
