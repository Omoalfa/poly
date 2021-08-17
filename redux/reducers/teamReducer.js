import * as types from '../actions/types'
const initialState = {
  teams: [],
  team: [],
  isLoading: false,
  teamLoading: false
};

export const teamReducer = (state = initialState, { type, payload, isLoading }) => {
  switch (type) {
    case types.GET_TEAMS:
      return {
        ...state,
        teams: payload,
        isLoading: isLoading
      };
    case types.GET_TEAM:
      return {
        ...state,
        team: payload,
        teamLoading: isLoading
      };
    default:
      return state
  }
}