import * as types from '../actions/types'
const initialState = {
  tasks: [],
  task: [],
  taskType: [],
  files: [],
  file: [],
  user: [],
  isLoading: false,
  isTaskLoading: false,
  isFileLoading: false
};

export const taskReducer = (state = initialState, { type, payload, isLoading }) => {
  switch (type) {
    case types.GET_TASKS:
      return {
        ...state,
        tasks: payload,
        isLoading: isLoading
      };
    case types.GET_TASK:
      return {
        ...state,
        task: payload,
        isTaskLoading: isLoading
      };
    case types.GET_TASK_TYPES:
      return {
        ...state,
        taskType: payload
      };
    case types.GET_FILES:
      return {
        ...state,
        files: payload,
        isFileLoading: isLoading
      };
    case types.GET_FILE:
      return {
        ...state,
        file: payload
      };
    case types.SET_USER:
      return {
        ...state,
        user: payload
      };
    default:
      return state
  }
}