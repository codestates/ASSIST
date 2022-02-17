import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class MerceneryDto {
  @IsString()
  money: string;
  @IsNumber()
  needNumber: number;
}
