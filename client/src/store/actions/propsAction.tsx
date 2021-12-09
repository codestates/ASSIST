import { propsState } from '../initialState';

export const ADD_PROPS = 'ADD_PROPS';
export const CLEAR_ALL = 'CLEAR_ALL';

export type PropsAction = ReturnType<typeof addProps> | ReturnType<typeof clearAll>;

export const addProps = (props: object) => {
  return { type: ADD_PROPS, payload: props };
};

export const clearAll = () => {
  return { type: CLEAR_ALL, payload: propsState };
};
