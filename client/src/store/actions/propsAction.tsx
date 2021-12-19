import { propsState } from '../initialState';

export const ADD_GETSTARTED = 'ADD_GETSTARTED';
export const ADD_CREATETEAM = 'ADD_CREATETEAM';
export const ADD_JOINTEAM = 'ADD_JOINTEAM';
export const ADD_SCHEDULEMANAGE = 'ADD_SCHEDULEMANAGE';
export const ADD_MATCH_ID = 'ADD_MATCH_ID';
export const ADD_TEAMMEMBERS = 'ADD_TEAMMEMBERS';
export const ADD_MERCENARYMEMBER = 'ADD_MERCENARYMEMBER';
export const MOD_LEADERID = 'MOD_LEADERID';
export const CLEAR_ALL = 'CLEAR_ALL';

export type PropsAction =
  | ReturnType<typeof addGetStarted>
  | ReturnType<typeof addCreateTeam>
  | ReturnType<typeof addJoinTeam>
  | ReturnType<typeof addScheduleManage>
  | ReturnType<typeof addTeamMembers>
  | ReturnType<typeof clearAll>;

export const addGetStarted = (props: object) => {
  return { type: ADD_GETSTARTED, payload: props };
};

export const addJoinTeam = (props: object) => {
  return { type: ADD_JOINTEAM, payload: props };
};

export const addCreateTeam = (props: object) => {
  return { type: ADD_CREATETEAM, payload: props };
};

export const addScheduleManage = (props: object) => {
  return { type: ADD_SCHEDULEMANAGE, payload: props };
};

export const addMatchId = (matchId: number) => {
  return { type: ADD_MATCH_ID, payload: matchId };
};

export const addTeamMembers = (props: object) => {
  return { type: ADD_TEAMMEMBERS, payload: props };
};

export const addMercenaryMember = (props: object) => {
  return { type: ADD_MERCENARYMEMBER, payload: props };
};

export const modifyLeaderId = (props: object) => {
  return { type: MOD_LEADERID, payload: props };
};

export const clearAll = () => {
  return { type: CLEAR_ALL, payload: propsState };
};
