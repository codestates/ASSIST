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

export type TeamInfo = {
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
};

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

export type VoteChoice = 'attend' | 'absent' | 'hold';

export type MatchInfo = {
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
} | null;

export type UserTeams = { id: number; name: string; leader: boolean }[];
