import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import RNPrint from 'react-native-print';
import moment from 'moment';
import {
  Icon, Picker, Header, Left, Body, Right, Button
} from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { REMOVE_USER } from '../../actions';
import styles from './styles';

class Home extends Component {
  constructor(props) {
    super(props);
    this.initialstate = {
      numUni: null,
      placa: null,
      conductor: null,
      km: null,
      costo: '',
      fch: null,
      hr: null,
      despach: null,
      nombstation: 'Toluca',
      selectedPrinter: null,
      date: new Date(),
      data: [],
    };

    this.state = this.initialstate;
  }

  clearInput = () => {
    this.setState(this.initialstate);
  };

  selectPrinter = async () => {
    const selectedPrinter = await RNPrint.selectPrinter({ x: 100, y: 100 });
    this.setState({ selectedPrinter });
  };

  sendData = () => {
    const fech = moment().format('L');
    const {
      data,
      numUni,
      placa,
      conductor,
      km,
      costo,
      nombstation,
    } = this.state;
    const hra = moment().format('LTS');
    const page = `<p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://189.194.249.170:83/atsem/url/iter-gas-natural-1.png" alt="" width="104" height="104" /></p>
    <p style="text-align: center;"><strong>Boulevard Alfredo del Mazo No. 522, Col. San Lorenzo Tepatitl&aacute;n, Toluca, Estado de M&eacute;xico, C.P. 50010.</strong></p>
    <p style="text-align: center;"><strong>T-000000${data.id}</strong></p>
    <p style="text-align: center;"><strong>FECHA: ${fech} HORA:${hra}</strong></p>
    <p style="text-align: left;">&nbsp;</p>
    <p style="text-align: center;"><strong>NUMERO DE UNIDAD:</strong></p>
    <p style="text-align: center;">${numUni}</p>
    <p style="text-align: center;"><strong>NUMERO DE PLACA: </strong></p>
    <p style="text-align: center;">${placa}</p>
    <p style="text-align: center;"><strong>NOMBRE CONDUCTOR: </strong></p>
    <p style="text-align: center;">${conductor}</p>
    <p style="text-align: center;"><strong>KILOMETROS: </strong></p>
    <p style="text-align: center;">${km}</p>
    <p style="text-align: center;"><strong>COSTO: </strong></p>
    <p style="text-align: center;">$${costo}</p>
    <p style="text-align: center;"><strong>DESPACHADOR: </strong></p>
    <p style="text-align: center;">${this.props.user.fullName}</p>
    <p style="text-align: center;"><strong>ESTACION: </strong></p>
    <p style="text-align: center;">${nombstation}</p>`;
    RNPrint.print({
      html: page,
    }).then(() => {
      console.log('CORRECTO');
    });
    this.clearInput();
  };

  insertData = () => {
    const numberId = numberId;
    const fech = moment().format('L');
    const hra = moment().format('LTS');
    /* eslint no-undef: 'off' */
    const form = new FormData();
    form.append('car_number', this.state.numUni);
    form.append('licence_plate', this.state.placa);
    form.append('driverName', this.state.conductor);
    form.append('km', this.state.km);
    form.append('cost', this.state.costo);
    form.append('date', fech);
    form.append('time', hra);
    form.append('dispatcher', this.props.user.fullName);
    form.append('station', this.state.nombstation);

    fetch('http://189.194.249.170:83/atsem/url/ticket/guardaTicket.php', {
      method: 'POST',
      body: form,
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({ data: response });
        this.sendData();
      })
      .catch((errors) => Alert.alert(`Algo salio mal al guardar el registro: ${errors}`));
  };

  headText = () => (
    <View style={styles.container}>
      {this.state.selectedPrinter && <View style={styles.container} />}
      <TouchableOpacity style={styles.button}>
        <Text>INGRESA DATOS</Text>
      </TouchableOpacity>
    </View>
  );

  customOptions = () => (
    <View style={styles.container}>
      {this.state.selectedPrinter && (
        <View style={styles.container}>
          <Text>{`Impresora seleccionada: ${this.state.selectedPrinter.name}`}</Text>
          <Text>{`Direccion: ${this.state.selectedPrinter.url}`}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={this.selectPrinter}>
        <Text>SELECCIONA UNA IMPRESORA</Text>
      </TouchableOpacity>
    </View>
  );

  updateSatet = (name, text) => {
    this.setState({
      [name]: text,
    });
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <Header>
          <Left />

          <Body />
          <Right>
            <Button
              hasText
              transparent
              onPress={() => Alert.alert(
                'Atención!',
                'Estas a punto de salir',
                [
                  {
                    text: 'CANCELAR',
                    onPress: () => null,
                  },
                  {
                    text: 'CONFIRMAR',
                    onPress: () => {
                      this.props.dispatch(REMOVE_USER());
                      Actions.signIn({ type: ActionConst.RESET });
                    },
                  },
                ],
                { cancelable: false }
              )}
            >
              <Text style={{ color: 'white' }}>Cerrar sesión</Text>
            </Button>
          </Right>
        </Header>
        <SafeAreaView>
          <ScrollView>
            {Platform.OS === 'android' && this.headText()}
            {Platform.OS === 'ios' && this.customOptions()}
            <View style={styles.container}>
              <TextInput
                placeholder="Numero Unidad"
                autoCapitalize="characters"
                returnKeyType="next"
                style={styles.inputStyle}
                onChangeText={(text) => this.updateSatet('numUni', text)}
                value={this.state.numUni}
              />
              <TextInput
                placeholder="Placa"
                autoCapitalize="characters"
                returnKeyType="next"
                style={styles.inputStyle}
                onChangeText={(text) => this.updateSatet('placa', text)}
                value={this.state.placa}
              />
              <TextInput
                placeholder="Nombre Conductor"
                autoCapitalize="characters"
                returnKeyType="next"
                style={styles.inputStyle}
                onChangeText={(text) => this.updateSatet('conductor', text)}
                value={this.state.conductor}
              />
              <TextInput
                placeholder="Kilometraje"
                keyboardType="numeric"
                returnKeyType="next"
                style={styles.inputStyle}
                onChangeText={(text) => this.updateSatet('km', text)}
                value={this.state.km}
              />
              <TextInput
                placeholder="Costo"
                keyboardType="numeric"
                returnKeyType="next"
                style={styles.inputStyle}
                onChangeText={(text) => this.updateSatet('costo', text)}
                value={this.state.costo}
              />
              <TextInput
                placeholder="Despachador"
                returnKeyType="next"
                style={styles.inputStyle}
                editable={false}
                onChangeText={(text) => this.updateSatet('despach', text)}
                value={this.props.user.fullName}
              />
              <Picker
                mode="dropdown"
                iosHeader="Estación"
                iosIcon={<Icon name="arrow-down" />}
                style={styles.pickerStyle}
                selectedValue={this.state.nombstation}
                onValueChange={(itemValue) => this.setState({ nombstation: itemValue })}
              >
                <Picker.Item label="Toluca" value="Toluca" />
                <Picker.Item label="Rayon" value="Rayon" />
                <Picker.Item label="Zinacantepec" value="Zinacantepec" />
              </Picker>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.insertData(this.state)}
              >
                <Text>ENVIAR</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps)(Home);
