import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class MerceneryDto {
  @IsNumber()
  money: number;
  @IsNumber()
  needNumber: number;
}
