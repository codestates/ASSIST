import {
  ADD_CREATETEAM,
  ADD_GETSTARTED,
  ADD_JOINTEAM,
  ADD_SCHEDULEMANAGE,
  ADD_TEAMMEMBERS,
  ADD_MERCENARYMEMBER,
  ADD_ADDONS,
  MOD_LEADERID,
  CLEAR_ALL,
  PropsAction,
} from '../actions/propsAction';
import { propsState } from '../initialState';

export default function propsReducer(state = propsState, action: PropsAction): typeof propsState {
  switch (action.type) {
    case ADD_CREATETEAM:
      return Object.assign({}, state, { createTeam: { ...state.createTeam, ...action.payload } });
    case ADD_GETSTARTED:
      return Object.assign({}, state, { getStarted: { ...state.getStarted, ...action.payload } });
    case ADD_JOINTEAM:
      return Object.assign({}, state, { joinTeam: { ...state.joinTeam, ...action.payload } });
    case ADD_SCHEDULEMANAGE:
      return Object.assign({}, state, {
        scheduleManage: { ...state.scheduleManage, ...action.payload },
      });
    case ADD_TEAMMEMBERS:
      return Object.assign({}, state, { teamMembers: { ...state.teamMembers, ...action.payload } });
    case ADD_MERCENARYMEMBER:
      return Object.assign({}, state, {
        mercenaryInvite: { ...state.mercenaryInvite, ...action.payload },
      });
    case ADD_ADDONS:
      return Object.assign({}, state, {
        addOns: { ...state.addOns, ...action.payload },
      });
    case MOD_LEADERID:
      return Object.assign({}, state, { newLeader: { ...state.newLeader, ...action.payload } });
    case CLEAR_ALL:
      return Object.assign({}, propsState);
    default:
      return state;
  }
}
