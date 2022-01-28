import { userState } from '../initialState';

export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_ACCESS_TOKEN = 'GET_ACCESS_TOKEN';
export const GET_SELECTED_TEAM = 'GET_SELECTED_TEAM';
export const LOG_OUT_USER = 'LOG_OUT_USER';
export const SELECT_TEAM_ASYNC = 'SELECT_TEAM_ASYNC';
export const CHANGE_ROLE = 'CHANGE_ROLE';

export type UserAction =
  | ReturnType<typeof getUserInfo>
  | ReturnType<typeof getAccessToken>
  | ReturnType<typeof logOutUser>
  | ReturnType<typeof changeRole>
  | ReturnType<typeof getSelectedTeam>;

export type UserInfoType = {
  id: string;
  email: string;
  name: string;
  phone: string;
  gender: string;
  role: RoleType;
  provider: string;
};

type RoleType = '' | 'tips' | 'tips2' | 'complete';

export type SelectedTeamType = {
  id: number;
  name: string;
  leader: boolean;
};

export const getUserInfo = (data: UserInfoType) => {
  return { type: GET_USER_INFO, payload: data };
};

export const changeRole = (role: RoleType) => {
  return { type: CHANGE_ROLE, payload: role };
};

export const getAccessToken = (accessToken: string) => {
  return { type: GET_ACCESS_TOKEN, payload: accessToken };
};

export const getSelectedTeam = (selectedTeam: SelectedTeamType) => {
  return { type: GET_SELECTED_TEAM, payload: selectedTeam };
};

export const logOutUser = () => {
  return { type: LOG_OUT_USER, payload: userState };
};
