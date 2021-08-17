import * as types from '../actions/types'
const initialState = {
  members: [],
  member: [],
  taskMember: [],
  teamMember:[],
  isLoading:false,
  isTeamLoading:false,
  isTaskLoading:false
};

export const memberReducer = (state = initialState, { type, payload,isLoading }) => {
  switch (type) {
    case types.GET_MEMBERS:
      return {
        ...state,
        members: payload
      };
    case types.GET_PROJECT_MEMBER:
      return {
        ...state,
        member: payload,
        isLoading:isLoading
      };
    case types.GET_TASK_MEMBER:
      return {
        ...state,
        taskMember: payload,
        isTaskLoading:isLoading
      };
    case types.GET_TEAM_MEMBER:
      return {
        ...state,
        teamMember: payload,
        isTeamLoading:isLoading
      };
    default:
      return state
  }
}