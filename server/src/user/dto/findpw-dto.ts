import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class FindpwDto {
  @IsNotEmpty()
  @IsNumber()
  number: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
