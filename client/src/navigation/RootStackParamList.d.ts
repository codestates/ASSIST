import { MatchInfo, VoteChoice } from '../../@types/global/types';

export type RootStackParamList = {
  NotFound: undefined;
  Create: undefined;
  Team: undefined | { teamId: string };
  Guest: undefined;
  User: undefined | { teamId: string };
  Match: undefined;
  AddOns_1: undefined;
  AddOns_2: undefined | { teamId: string };
  AddOns_3: undefined | { bank?: string; paymentDay?: string; teamId: number };
  AddOns_4: { inviteCode: string | undefined };
  MyPage: undefined;
  Lobby: undefined;
  TeamSelect: undefined;
  CreateTeam: undefined;
  CreateTeam_1: undefined;
  CreateTeam_2: undefined | { paymentDay: string };
  CreateTeam_3: undefined | { bank: string };
  CreateTeam_4: undefined;
  CreateTeam_5: undefined | { inviteCode: string };
  CreateTeam_6: undefined;
  BankSelect: { name: keyof RootStackParamList };
  Intro: undefined;
  IntroPage: undefined;
  IntroPage_1: undefined;
  IntroPage_2: undefined;
  IntroPage_3: undefined;
  IntroPage_4: undefined;
  IntroPage_5: undefined;
  JoinTeam: undefined;
  JoinTeam_1: undefined | { reset: boolean; inviteCode?: string };
  JoinTeam_2: undefined;
  JoinTeam_3: undefined;
  GetStarted: undefined;
  GetStarted_1: undefined;
  GetStarted_2: undefined;
  GetStarted_3: undefined | { phone: string };
  GetStarted_4: undefined;
  GetStarted_5: undefined | { gender: string };
  GetStarted_6: undefined | { accessToken: string };
  GenderSelect: undefined | { screenName: keyof RootStackParamList };
  GetStarted_Login: undefined | { email: string; name: string; phone: string };
  ScheduleManage: undefined;
  ScheduleManage_1: undefined | { date?: string; startTime?: string; endTime?: string };
  ScheduleManage_2: undefined | { modal: boolean; stadiumAddr: string };
  ScheduleManage_3: undefined;
  ScheduleManage_4: undefined;
  ScheduleManage_5: undefined | { matchId: string | number };
  CalendarSelect: undefined | { date: string };
  TimeSelect: undefined | { time: 'start' | 'end'; startTime?: string; endTime?: string };
  StadiumSelect: undefined | { modal: boolean; stadiumAddr: string };
  ChangePassword: undefined | { screenName?: keyof RootStackParamList; phone?: string };
  FindPassword:
    | undefined
    | { screenName?: keyof RootStackParamList; phone?: string; email?: string };
  FindPassword_1: undefined | { screenName?: keyof RootStackParamList; phone?: string };
  FindPassword_2:
    | undefined
    | { screenName?: keyof RootStackParamList; code?: number; email?: string };
  MyPage_Main: undefined;
  NewPhone: undefined;
  NewPhone_1: undefined;
  NewPhone_2: undefined | { phone: string };
  MyProfile: undefined;
  MyProfile_1: undefined | { gender: string };
  MatchVote: undefined | { matchId?: number };
  MatchVote_Main: undefined | { matchId?: number };
  MatchVote_1: undefined | { data: MatchInfo };
  MatchVote_2: undefined | { data: MatchInfo };
  MatchVote_3: undefined | { data: MatchInfo };
  MatchVote_4: undefined | { data: MatchInfo };
  MatchVote_5: undefined | { data: MatchInfo; inGame?: boolean };
  MatchVote_6: undefined | { matchId?: number | string };
  VoteSelect: undefined | { vote: VoteChoice; matchId?: number };
  CancelSelect: undefined | { matchId?: number };
  ConfirmSelect: undefined | { matchId?: number };
  CreateOrJoin: undefined;
  MercenaryInvite: undefined;
  MercenaryInvite_1: undefined;
  MercenaryInvite_2: undefined;
  MercenaryInvite_3: undefined;
  MercenaryInvite_4: undefined;
  MercenaryInvite_5: undefined;
  CustomerService: undefined;
  CustomerSerice_1: undefined;
  LogOutSelect: undefined;
  DeleteAccount_1: undefined;
  DeleteAccount_2: undefined;
  PaymentDaySelect: { name: keyof RootStackParamList };
  QuickTips: undefined;
  QuickTips_1: undefined;
  QuickTips_2: undefined;
  QuickTips_3: undefined;
  QuickTips_4: undefined;
  QuickTips_5: undefined;
  QuickTips_6: undefined;
  QuickTips_7: undefined;
  TeamTips: undefined;
  TeamTips_1: undefined;
  TeamTips_2: undefined;
  TeamTips_3: undefined;
  TeamTips_4: undefined;
  TeamTips_5: undefined;
  TeamTips_6: undefined;
};
