import { IsString, IsOptional, IsNumber } from 'class-validator';
export class UpdateTeamDto {
  @IsOptional()
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
  @IsOptional()
  @IsString()
  leaderId: number;
}
