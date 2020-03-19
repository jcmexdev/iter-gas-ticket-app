/* global FormData */
import * as URLS from './constants';

export const LOGIN = async (user, password) => {
  const data = new FormData();
  data.append('user', user);
  data.append('password', password);

  try {
    let response = await fetch(URLS.LOGIN_URL, {
      method: 'POST',
      body: data,
    });
    response = await response.json();
    return response;
  } catch (error) {
    return false;
  }
};

export const LOAD_DRIVERS = async () => {
  try {
    let response = await fetch(URLS.LOAD_DRIVERS_URL);
    response = await response.json();
    return response;
  } catch (error) {
    return false;
  }
};

export const LOAD_PLATES = async () => {
  try {
    let response = await fetch(URLS.LOAD_PLATES_URL);
    response = await response.json();
    return response;
  } catch (error) {
    return false;
  }
};
