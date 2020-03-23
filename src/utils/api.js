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

export const STORE_TICKET = async (state, date, time, authUserName) => {
  const form = new FormData();
  form.append('car_number', state.numUni);
  form.append('licence_plate', state.placa);
  form.append('driverName', state.conductor);
  form.append('km', state.km);
  form.append('liters', state.liters);
  form.append('date', date);
  form.append('time', time);
  form.append('dispatcher', authUserName);
  form.append('station', state.nombstation);
  form.append('work_shift', state.workShift);
  form.append('pump', state.pump);
  form.append('hose', state.hose);
  try {
    let response = await fetch(URLS.STORE_TICKET_URL, {
      method: 'POST',
      body: form,
    });
    response = await response.json();
    return response;
  } catch (error) {
    return false;
  }
};
