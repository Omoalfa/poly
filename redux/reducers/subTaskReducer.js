import * as types from '../actions/types'
const initialState = {
  subtasks: [],
  isLoading: false
};

export const subTaskReducer = (state = initialState, { type, payload, isLoading }) => {
  switch (type) {
    case types.GET_SUB_TASKS:
      return {
        ...state,
        subtasks: payload,
        isLoading: isLoading
      };
    default:
      return state
  }
}