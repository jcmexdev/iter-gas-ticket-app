import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

/*= ================SCENES================= */
import Home from './screens/home';
import SignIn from './screens/signin';

const AppNavigation = () => (
  <Router>
    <Stack key="root" headerMode="none">
      <Scene key="signIn" component={SignIn} initial />
      <Scene key="home" component={Home} />
    </Stack>
  </Router>
);

export default AppNavigation;
