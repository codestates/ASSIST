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
      daypassing: boolean;
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

export type User = {
  id: number;
  name: string;
  phone: string;
};

export type VoteUser = {
  id: number;
  condition: string;
  user: User;
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
      daypassing: boolean;
      vote: VoteChoice;
      attend: VoteUser[];
      absent: VoteUser[];
      hold: VoteUser[];
      nonRes: VoteUser[];
      team: { id: number };
    }
  | null
  | undefined;

export type UserTeams = { id: number; name: string; leader: boolean }[];
export type UserTeam = { id: number; name: string; leader: boolean };

export type TeamLastMatchs = {
  totalPage: number;
  lastMatchs: LastMatchs;
} | null;

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
  daypassing: boolean;
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
