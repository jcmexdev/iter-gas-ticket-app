import React from 'react';
import { Provider } from 'react-redux';
import AppNavigation from './AppNavigation';
import store from './Store';

const SetUp = () => (
  <Provider store={store}>
    <AppNavigation />
  </Provider>
);

export default SetUp;
