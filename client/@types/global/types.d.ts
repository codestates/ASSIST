import { LayoutRectangle } from 'react-native';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    Kakao: any;
  }
}

export type MatchDetail =
  | {
      id: number;
      address: string;
      address2: string;
      condition: '인원 모집 중' | '경기 확정';
      reason: string;
      date: string;
      day: string;
      startTime: string;
      endTime: string;
      deadline: string;
      vote: false;
      attend: Array;
      absent: Array;
      hold: Array;
      nonRes: Array;
    }
  | null
  | undefined;

export type NextMatch =
  | {
      id: number;
      address: string;
      address2: string;
      condition: '인원 모집 중' | '경기 확정';
      reason: string;
      date: string;
      day: string;
      startTime: string;
      endTime: string;
      deadline: string;
      vote: false;
    }
  | null
  | undefined;

export type TeamInfo =
  | {
      name: string;
      paymentDay: number;
      accountNumber: string;
      accountBank: string;
      dues: string;
      inviteCode: string;
      leaderId: number;
      leaderName: string;
      leaderPhone: string;
      nextMatch: NextMatch;
    }
  | undefined;

export type FirstTeam = {
  id: number;
  name: string;
  leader: boolean;
  nextMatch: NextMatch;
};

export type VoteUser = {
  id: number;
  condition: string;
  reason: string | null;
  user: { name: string; phone: string };
};

export type VoteChoice = 'attend' | 'absent' | 'hold' | 'nonRes';

export type MatchInfo =
  | {
      id: number;
      address: string;
      address2: string;
      condition: '인원 모집 중' | '경기 확정';
      reason: string;
      date: string;
      day: string;
      startTime: string;
      endTime: string;
      deadline: string;
      vote: VoteChoice;
      attend: VoteUser[];
      absent: VoteUser[];
      hold: VoteUser[];
      nonRes: VoteUser[];
    }
  | null
  | undefined;

export type UserTeams = { id: number; name: string; leader: boolean }[];
export type UserTeam = { id: number; name: string; leader: boolean };

export type User = {
  id: number;
  condition: string;
  reason: string;
  user: Array<{
    name: string;
    phone: string;
  }>;
};

export type TeamLastMatchs = {
  totalPage: number;
  lastMatchs: LastMatchs;
};

export type LastMatchs = Array<{
  id: number;
  address: string;
  address2: string;
  condition: string;
  date: string;
  day: string;
  startTime: string;
  endTime: string;
  deadline: string;
  reason: string;
}>;

export interface LayoutType extends LayoutRectangle {
  top: number;
  left: number;
}

export type LayoutProps = {
  layout?: LayoutType;
};

export type ListType = {
  value: string;
};
