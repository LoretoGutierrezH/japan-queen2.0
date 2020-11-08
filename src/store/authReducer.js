import * as actionTypes from './actionTypes';

const initialState = {
    authenticated: false,
}

const authReducer = (state = initialState, action) => {
  if (action.type === actionTypes.AUTHENTICATE) {
    return state = {
      ...state,
      authenticated: action.value
    }
  }
  return state;
}

export default authReducer;