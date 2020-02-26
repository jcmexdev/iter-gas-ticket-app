import React from 'react';
import {
  KeyboardAvoidingView,
  View,
  Image,
  TextInput,
  Platform,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import iterGasLogo from '../../images/iter-gas-natural.png';
import styles from './styles';

const SignIn = () => {
  const isIos = Platform.OS === 'ios';
  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : ''}
      keyboardVerticalOffset={isIos ? 44 : 0}
    >
      <SafeAreaView>
        <View style={styles.signin}>
          <View style={styles.top}>
            <View style={styles.logo_container}>
              <Image
                source={iterGasLogo}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.form}>
              <TextInput placeholder="Usuario" style={styles.input} />
              <TextInput placeholder="Contraseña" style={styles.input} />
              <TouchableOpacity style={styles.btnSignin}>
                <Text style={styles.btnSigninText}>Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
