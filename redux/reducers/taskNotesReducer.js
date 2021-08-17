import * as types from '../actions/types'
const initialState = {
  notes: [],
  note:[],
  isLoading: false,
  innerLoading:false
};

export const taskNotesReducer = (state = initialState, { type, payload, isLoading }) => {
  switch (type) {
    case types.GET_NOTES:
      return {
        ...state,
        notes: payload,
        isLoading: isLoading
      };
    case types.GET_NOTE:
      return {
        ...state,
        note: payload,
        innerLoading: isLoading
      };
    default:
      return state
  }
}