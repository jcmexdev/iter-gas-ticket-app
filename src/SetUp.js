import React from 'react';
import { Provider } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigation from './AppNavigation';
import { store, persistor } from './Store';

const SetUp = () => (
  <Provider store={store}>
    <PersistGate
      loading={<ActivityIndicator size="small" color="orange" />}
      persistor={persistor}
    >
      <AppNavigation />
    </PersistGate>
  </Provider>
);

export default SetUp;
