import { IsString, IsNumber, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateMatchDto {
  @IsNumber()
  teamId: number;
  @IsString()
  address: string;
  @IsString()
  address2: string;
  @IsString()
  date: string;
  @IsOptional()
  @IsBoolean()
  daypassing: boolean;
  @IsString()
  startTime: string;
  @IsString()
  endTime: string;
  @IsString()
  deadline: string;
}
