import { ADD_PROPS, CLEAR_ALL, PropsAction } from '../actions/propsAction';
import { propsState } from '../initialState';

export default function signUpReducer(state = propsState, action: PropsAction) {
  switch (action.type) {
    case ADD_PROPS:
      return Object.assign({}, state, action.payload);
    case CLEAR_ALL:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}
