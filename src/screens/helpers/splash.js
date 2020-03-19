import React from 'react';
import {
  View, Text, StyleSheet, ActivityIndicator, Image
} from 'react-native';
import iterGasLogo from '../../images/iter-gas-natural.png';

const Splash = () => (
  <View style={styles.container}>
    <Image resizeMode="contain" source={iterGasLogo} style={styles.logo} />
    <ActivityIndicator size="large" color="#ed6c1c" style={styles.indicator} />
    <Text style={styles.loading}>Cargando, espere...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    height: 200,
  },
  loading: {
    color: '#ed6c1c',
  },
  indicator: {
    marginVertical: 24,
  },
});

export default Splash;
