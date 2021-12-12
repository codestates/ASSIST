import { IsEnum } from 'class-validator';

export enum voteCondition {
  attend = '참석',
  absent = '불참',
  hold = '미정',
}

export class VoteMatchDto {
  @IsEnum(voteCondition)
  vote: voteCondition;
}
