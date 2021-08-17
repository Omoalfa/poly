import * as types from '../actions/types'
const initialState = {
  projects: [],
  project: [],
  isLoading: false,
  projectLoading: false,
  homepageDetail: [],
  projectdetail: [],
  isHomeLoding: false,
  ispageLoading: false
};

export const projectReducer = (state = initialState, { type, payload, isLoading }) => {
  switch (type) {
    case types.GET_PROJECTS:
      return {
        ...state,
        projects: payload,
        isLoading: isLoading
      };
    case types.GET_PROJECT:
      return {
        ...state,
        project: payload,
        projectLoading: isLoading
      };
    case types.GET_HOME_PAGE_DETAILS:
      return {
        ...state,
        homepageDetail: payload,
        isHomeLoding: isLoading
      };
    case types.GET_HOME_PAGE_DETAIL:
      return {
        ...state,
        projectdetail: payload,
        ispageLoading: isLoading
      };
    default:
      return state
  }

}