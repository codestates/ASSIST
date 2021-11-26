import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsNumber()
  paymentDay: number;
  @IsOptional()
  @IsString()
  accountNumber: string;
  @IsOptional()
  @IsString()
  accountBank: string;
}
