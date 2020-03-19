import * as actions from './types';

export const SET_USER = (fullName) => ({
  type: actions.SET_USER,
  payload: {
    fullName,
  },
});

export const REMOVE_USER = () => ({
  type: actions.REMOVE_USER,
});

export const SET_DRIVERS = (drivers) => ({
  type: actions.SET_DRIVERS,
  drivers,
});

export const SET_PLATES = (plates) => ({
  type: actions.SET_PLATES,
  plates,
});
