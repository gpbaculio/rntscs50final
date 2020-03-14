import {AppStateType, AppActionTypes} from './types';
import {
  RESTORE_TOKEN,
  SIGN_IN_SUCCESS,
  SIGN_IN_REQUEST,
  SIGN_IN_FAILURE,
  SIGN_OUT,
} from './constants';

export const authInitState = {
  loading: false,
  token: null,
  user: null,
  error: '',
};

export const authReducer = (state: AppStateType, action: AppActionTypes) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: '',
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case RESTORE_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        loading: false,
      };
    case SIGN_OUT:
      return authInitState;
    default:
      return state;
  }
};
