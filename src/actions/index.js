import * as actions from './types';

export const SET_USER = (fullName) => ({
  type: actions.SET_USER,
  payload: {
    fullName,
  },
});
