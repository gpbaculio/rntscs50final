import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  RESTORE_TOKEN,
  SIGN_OUT,
} from './constants';
import {
  SignInRequestType,
  SignInSuccessType,
  SignInFailureType,
  RestoreTokenType,
  SignoutType,
} from './types';

export const signInRequest: () => SignInRequestType = () => ({
  type: SIGN_IN_REQUEST,
});

export const signInSuccess: (
  email: string,
  token: string,
) => SignInSuccessType = (email, token) => ({
  type: SIGN_IN_SUCCESS,
  payload: {
    email,
    token,
  },
});

export const signInFailure: (error: string) => SignInFailureType = error => ({
  type: SIGN_IN_FAILURE,
  payload: {
    error,
  },
});

export const signOut: () => SignoutType = () => ({
  type: SIGN_OUT,
});

export const restoreToken: (token: string) => RestoreTokenType = token => ({
  type: RESTORE_TOKEN,
  payload: {
    token,
  },
});
