import * as actions from './types';

export const OPEN_DRAWER = () => ({
  type: actions.OPEN_DRAWER,
});

export const CLOSE_DRAWER = () => ({
  type: actions.CLOSE_DRAWER,
});

export const SET_USER = (user) => ({
  type: actions.SET_USER,
  payload: user,
});
