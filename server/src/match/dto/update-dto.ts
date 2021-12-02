import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from 'class-validator';

export enum condition {
  cancel = '경기 취소',
  confirm = '경기 확정',
}

export class UpdateMatchDto {
  @IsEnum(condition)
  condition: condition;
}
