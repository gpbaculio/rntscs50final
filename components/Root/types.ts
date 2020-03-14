import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  RESTORE_TOKEN,
  SIGN_OUT,
} from './constants';

export type UserType = {
  id: number;
  email: string;
  avatar: string;
  phone: string;
  name: string;
  address: string;
};

export interface AppStateType {
  loading: boolean;
  user: UserType;
  token: string | null;
  error: string;
}

export type SignInRequestType = {
  type: typeof SIGN_IN_REQUEST;
};

export type SignInSuccessType = {
  type: typeof SIGN_IN_SUCCESS;
  payload: {
    user: UserType;
    token: string;
  };
};

export type SignInFailureType = {
  type: typeof SIGN_IN_FAILURE;
  payload: {
    error: string;
  };
};

export type RestoreTokenType = {
  type: typeof RESTORE_TOKEN;
  payload: {
    token: string;
  };
};

export type SignoutType = {
  type: typeof SIGN_OUT;
};

export type AppActionTypes =
  | SignoutType
  | RestoreTokenType
  | SignInRequestType
  | SignInSuccessType
  | SignInFailureType;
