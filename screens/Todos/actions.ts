import {
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  SET_FILTER,
  CLEAR_COMPLETED_REQUEST,
  CLEAR_COMPLETED_SUCCESS,
} from './constants';
import {
  FetchTodosRequestType,
  FetchTodosSuccessType,
  FilterType,
  SetFilterType,
  ClearCompletedRequestType,
  ClearCompletedSuccessType,
} from './types';

export const fetchTodosRequest: () => FetchTodosRequestType = () => ({
  type: FETCH_TODOS_REQUEST,
});

export const fetchTodosSuccess: (
  todos: any,
  todoIds: string[],
) => FetchTodosSuccessType = (todos, todoIds) => ({
  type: FETCH_TODOS_SUCCESS,
  payload: {
    todos,
    todoIds,
  },
});

export const setFilter: (filter: FilterType) => SetFilterType = filter => ({
  type: SET_FILTER,
  payload: {
    filter,
  },
});

export const clearCompletedRequest: () => ClearCompletedRequestType = () => ({
  type: CLEAR_COMPLETED_REQUEST,
});

export const clearCompletedSuccess: (
  todos: any[],
  todoIds: string[],
) => ClearCompletedSuccessType = (todos, todoIds) => ({
  type: CLEAR_COMPLETED_SUCCESS,
  payload: {
    todos,
    todoIds,
  },
});
