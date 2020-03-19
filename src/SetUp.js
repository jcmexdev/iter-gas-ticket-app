import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Splash from './screens/helpers/splash';
import AppNavigation from './AppNavigation';
import { store, persistor } from './Store';
import { LOAD_DRIVERS, LOAD_PLATES } from './utils/api';
import { SET_DRIVERS, SET_PLATES } from './actions';

class SetUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    const driversResponse = await LOAD_DRIVERS();
    store.dispatch(SET_DRIVERS(driversResponse.drivers));
    const platesResponse = await LOAD_PLATES();
    store.dispatch(SET_PLATES(platesResponse.plates));
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Splash />;
    }
    return (
      <Provider store={store}>
        <PersistGate loading={<Splash />} persistor={persistor}>
          <AppNavigation />
        </PersistGate>
      </Provider>
    );
  }
}

export default SetUp;
