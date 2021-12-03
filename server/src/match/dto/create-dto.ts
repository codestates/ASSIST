import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMatchDto {
  @IsNumber()
  teamId: number;
  @IsString()
  station: string;
  @IsString()
  date: string;
  @IsString()
  startTime: string;
  @IsString()
  endTime: string;
  @IsString()
  deadline: string;
}
