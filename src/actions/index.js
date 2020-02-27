import * as actions from './types';

const SET_USER = (fullName) => ({
  type: actions.SET_USER,
  payload: {
    fullName,
  },
});

export default {
  SET_USER,
};
