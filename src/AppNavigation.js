import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

/*= ================SCENES================= */
import Home from './screens/home';
import SignIn from './screens/signin';

const AppNavigation = () => (
  <Router>
    <Stack key="root">
      <Scene key="signIn" component={SignIn} title="Login" initial />
      <Scene key="home" component={Home} hideNavBar />
    </Stack>
  </Router>
);

export default AppNavigation;
