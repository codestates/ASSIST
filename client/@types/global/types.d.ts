export type NextMatch = {
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
} | null;

export type FirstTeam = {
  id: number;
  name: string;
  leader: boolean;
  nextMatch: NextMatch;
};

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
