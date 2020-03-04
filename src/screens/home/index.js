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
  Icon,
  Picker,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
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
      despach,
      nombstation,
    } = this.state;
    const hra = moment().format('LTS');
    const page = `<P align=middle><strong>******* TICKET ITER GAS> *******</strong><P> <h1 style="color:green; text-decoration:'underline">FECHA: ${fech}  HORA: ${hra}</h1> __________________________________________________________________________________________<br><h2 style="color:green; text-decoration:'underline">Numero Ticket: T-000000${data.id}</h2>
        <h2 style="color:green; text-decoration:'underline">Numero Unidad: ${numUni}</h2><h2>Numero de placa: ${placa}</h2><h2>Nombre conductor: ${conductor}</h2><h2>Kilometraje: ${km}</h2><h2>Costo: $${costo}</h2>
        <h2>Despachador: ${despach}</h2>
        <h2>Estacion: ${nombstation}</h2>
        __________________________________________________________________________________________<br>`;
    RNPrint.print({
      html: page,
    }).then(() => {
      Alert.alert('DATOS INSERTADOS E IMPRESION... CORRECTO');
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
    form.append('dispatcher', this.state.despach);
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
          <Body>
            <Title style={{ alignItems: 'center' }}>REGISTRO</Title>
          </Body>
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
              <Text>Cerrar sesion</Text>
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
                autoFocus
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
                onChangeText={(text) => this.updateSatet('despach', text)}
                value={this.state.despach}
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
