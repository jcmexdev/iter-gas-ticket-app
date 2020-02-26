import React from 'react';
import { Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

const SignIn = () => <Button title="GO HOME" onPress={() => Actions.home()} />;

export default SignIn;
