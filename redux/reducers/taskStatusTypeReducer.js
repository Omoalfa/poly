import * as types from '../actions/types'
const initialState = {
  taskStatus: [],
  taskStatusType: [],
  isStatusLoading:false,
  isLoading: false
};

export const taskStatusReducer = (state = initialState, { type, payload, isLoading }) => {
  switch (type) {
    case types.GET_TASK_STATUS_TYPES:
      return {
        ...state,
        taskStatus: payload,
        isStatusLoading: isLoading
      };
    case types.GET_TASK_STATUS_TYPE:
      return {
        ...state,
        taskStatusType: payload,
        isLoading: isLoading
      };
    default:
      return state
  }
}