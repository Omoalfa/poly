import * as types from '../actions/types'
const initialState = {
  activities: [],
  isLoading:false
};

export const activityReducer = (state = initialState, { type, payload,isLoading }) => {
  switch (type) {
    case types.GET_ACTIVITIES:
      return {
        ...state,
        activities: payload,
        isLoading:isLoading
      };
    default:
      return state
  }
}