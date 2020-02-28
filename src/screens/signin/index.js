import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  View,
  Image,
  TextInput,
  Platform,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { SET_USER } from '../../actions';
import iterGasLogo from '../../images/iter-gas-natural.png';
import styles from './styles';

class SignIn extends Component {
  isIos = Platform.OS === 'ios';

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      message: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    if (this.props.user != null) {
      setTimeout(() => {
        Actions.home({ type: ActionConst.RESET });
      }, 0);
    }
  }

  handleInput = (text, name) => {
    this.setState({
      [name]: text,
      message: '',
    });
  };

  submit = () => {
    this.setState({ isLoading: true });
    /* eslint no-undef: 'off' */
    const data = new FormData();
    data.append('user', this.state.user);
    data.append('password', this.state.password);

    fetch('http://189.194.249.170:83/atsem/url/ticket/login.php', {
      method: 'POST',
      body: data,
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({ isLoading: false });
        this.handleResponse(response);
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        Alert.alert(`Algo salio mal: ${error}`);
      });
  };

  handleResponse = ({ status, message, user }) => {
    // el usuario o contraseña no fueron enviados
    if (status === 400) {
      this.setState({
        message,
      });
    }
    if (status === 200) {
      // El usuario no conincide
      if (user === null) {
        this.setState({
          message,
        });
      } else {
        // El usuario fue encontrado
        this.props.dispatch(SET_USER(user.fullName));
        Actions.home({ type: ActionConst.RESET });
      }
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={this.isIos ? 'padding' : ''}
        keyboardVerticalOffset={this.isIos ? 44 : 0}
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
                <Text style={styles.error}>{this.state.message}</Text>
                <TextInput
                  spellCheck={false}
                  autoCapitalize="none"
                  placeholder="Usuario"
                  style={styles.input}
                  onChangeText={(text) => this.handleInput(text, 'user')}
                />
                <TextInput
                  spellCheck={false}
                  secureTextEntry
                  autoCapitalize="none"
                  placeholder="Contraseña"
                  style={styles.input}
                  onChangeText={(text) => this.handleInput(text, 'password')}
                />
                <TouchableOpacity
                  style={styles.btnSignin}
                  onPress={this.submit}
                >
                  <Text style={styles.btnSigninText}>
                    Entrar
                    {' '}
                    {this.state.isLoading && (
                      <ActivityIndicator
                        size="small"
                        color="white"
                        style={{ marginLeft: 16, width: 30, height: 30 }}
                      />
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps)(SignIn);
