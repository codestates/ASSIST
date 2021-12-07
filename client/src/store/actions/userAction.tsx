import { userState } from '../initialState';

export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_ACCESS_TOKEN = 'GET_ACCESS_TOKEN';
export const LOG_OUT_USER = 'LOG_OUT_USER';

export type UserAction =
  | ReturnType<typeof getUserInfo>
  | ReturnType<typeof getAccessToken>
  | ReturnType<typeof logOutUser>;

export type UserInfoType = {
  id: string;
  email: string;
  name: string;
  phone: string;
  gender: string;
  role: string;
  team: string[];
};

export const getUserInfo = (data: UserInfoType) => {
  return { type: GET_USER_INFO, payload: data };
};

export const getAccessToken = (accessToken: string) => {
  return { type: GET_ACCESS_TOKEN, payload: accessToken };
};

export const logOutUser = () => {
  return { type: LOG_OUT_USER, payload: userState };
};
