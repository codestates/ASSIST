import { ADD_EMAIL, ADD_PASSWORD, ADD_PHONE, CLEAR_ALL, PropsAction } from '../actions/propsAction';
import { propsState } from '../initialState';

export default function signUpReducer(state = propsState, action: PropsAction) {
  switch (action.type) {
    case ADD_EMAIL:
      return Object.assign({}, state, action.payload);
    case ADD_PASSWORD:
      return Object.assign({}, state, action.payload);
    case ADD_PHONE:
      return Object.assign({}, state, action.payload);
    case CLEAR_ALL:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}
