import { propsState } from '../initialState';

export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_PASSWORD = 'ADD_PASSWORD';
export const ADD_PHONE = 'ADD_PHONE';
export const ADD_NAME = 'ADD_NAME';
export const ADD_GENDER = 'ADD_GENDER';
export const CLEAR_ALL = 'CLEAR_ALL';

export type PropsAction =
  | ReturnType<typeof addEmail>
  | ReturnType<typeof addPassword>
  | ReturnType<typeof addPhone>
  | ReturnType<typeof clearAll>;

export const addEmail = (email: string) => {
  return { type: ADD_EMAIL, payload: { email } };
};

export const addPassword = (password: string) => {
  return { type: ADD_PASSWORD, payload: { password } };
};

export const addPhone = (phone: string) => {
  return { type: ADD_PHONE, payload: { phone } };
};

export const clearAll = () => {
  return { type: CLEAR_ALL, payload: propsState };
};
