import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
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
      liters: null,
      costo: null,
      fch: null,
      hr: null,
      hose: null,
      workShift: null,
      pump: null,
      nombstation: 'Toluca',
      selectedPrinter: null,
      date: new Date(),
      data: [],
      isLoading: false,
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

  printTicket = () => {
    const fech = moment().format('L');
    const {
      data,
      numUni,
      placa,
      conductor,
      km,
      liters,
      costo,
      nombstation,
      hose,
      workShift,
      pump,
    } = this.state;
    const hra = moment().format('LTS');
    const page = `
      <p>
        <img
          style="display: block; margin-left: auto; margin-right: auto;"
          src="http://189.194.249.170:83/atsem/url/iter-gas-natural-1.png"
          alt=""
          width="104"
          height="104"
        />
      </p>
      <p style="margin:0px; margin-top:8px; font-size: 12px; text-align: center;">
        <strong>
          Boulevard Alfredo del Mazo No. 522, Col. San Lorenzo Tepatitl&aacute;n,
          Toluca, Estado de M&eacute;xico, C.P. 50010.
        </strong>
      </p>
      <p style="margin:0px; margin-top:8px; font-size: 12px; text-align: center; ">
        <strong>T-000000${data.id}</strong>
      </p>
      <p style="margin:0px; margin-top:8px; font-size: 12px; text-align: center;">
        <strong>FECHA:${fech} HORA:${hra}</strong>
      </p>
      <p style="margin:0px; margin-top:8px; font-size: 12px; text-align: center;">
        ${numUni}
      </p>
      <p style="margin:0px; margin-top:16px; font-size: 12px; text-align: center;">
        <strong>NUMERO DE PLACA: </strong>
      </p>
      <p style="margin:0px; margin-top:4px; font-size: 12px; text-align: center;">
        ${placa}
      </p>
      <p style="margin:0px; margin-top:16px; font-size: 12px; text-align: center;">
        <strong>NOMBRE CONDUCTOR: </strong>
      </p>
      <p style="margin:0px; margin-top:4px; font-size: 12px; text-align: center;">
        ${conductor}
      </p>
      <p style="margin:0px; margin-top:16px; font-size: 12px; text-align: center;">
        <strong>KILOMETROS: </strong>
      </p>
      <p style="margin:0px; margin-top:4px; font-size: 12px; text-align: center;">
        ${km}
      </p>
      <p style="margin:0px; margin-top:16px; font-size: 12px; text-align: center;">
      <strong>LITROS: </strong>
    </p>
    <p style="margin:0px; margin-top:4px; font-size: 12px; text-align: center;">
      ${liters}
    </p>
      <p style="margin:0px; margin-top:16px; font-size: 12px; text-align: center;">
        <strong>COSTO: </strong>
      </p>
      <p style="margin:0px; margin-top:4px; font-size: 12px; text-align: center;">
        ${costo}
      </p>
      <p style="margin:0px; margin-top:16px; font-size: 12px; text-align: center;">
        <strong>DESPACHADOR: </strong>
      </p>
      <p style="margin:0px; margin-top:4px; font-size: 12px; text-align: center;">
        ${this.props.user.fullName}
      </p>
      <p style=" font-size: 12px; text-align: center;">
        <strong>ESTACION: </strong>
      </p>
      <p style=" font-size: 12px; text-align: center;">
        ${nombstation}
      </p>
      <p style=" font-size: 12px; text-align: center;">
      <strong>ESTACION: </strong>
    </p>

    <p style=" font-size: 12px; text-align: center;">
      ${workShift}
    </p>

    <p style=" font-size: 12px; text-align: center;">
    <strong>ESTACION: </strong>
  </p>
  <p style=" font-size: 12px; text-align: center;">
    ${pump}
  </p>


  <p style=" font-size: 12px; text-align: center;">
  <strong>ESTACION: </strong>
</p>
<p style=" font-size: 12px; text-align: center;">
  ${hose}
</p>
      `;
    RNPrint.print({
      html: page,
    }).then(() => {});
    this.clearInput();
  };

  validateBeforeInsert = () => {
    const fields = [
      'numUni',
      'placa',
      'conductor',
      'km',
      'costo',
      'hose',
      'workShift',
    ];
    const result = fields.filter((item) => this.state[item] == null);
    if (result.length > 0) {
      Alert.alert(
        'Completa el formulario',
        'Todos los campos del formulario deben ser llenados'
      );
      return false;
    }
    return true;
  };

  insertData = () => {
    if (!this.validateBeforeInsert()) {
      return 0;
    }

    this.setState({
      isLoading: true,
    });
    const numberId = numberId;
    const fech = moment().format('L');
    const hra = moment().format('LTS');

    if (this.state.hose === 1 || this.state.hose === 2) {
      this.state.pump = '1';
    } else if (this.state.hose === 3 || this.state.hose === 4) {
      this.state.pump = '2';
    } else if (this.state.hose === 5 || this.state.hose === 6) {
      this.state.pump = '3';
    } else if (this.state.hose === 7 || this.state.hose === 8) {
      this.state.pump = '4';
    } else if (this.state.hose === 9 || this.state.hose === 10) {
      this.state.pump = '5';
    } else if (this.state.hose === 11 || this.state.hose === 12) {
      this.state.pump = '6';
    }
    /* eslint no-undef: 'off' */
    const form = new FormData();
    form.append('car_number', this.state.numUni);
    form.append('licence_plate', this.state.placa);
    form.append('driverName', this.state.conductor);
    form.append('km', this.state.km);
    form.append('liters', this.state.liters);
    form.append('cost', this.state.costo);
    form.append('date', fech);
    form.append('time', hra);
    form.append('dispatcher', this.props.user.fullName);
    form.append('station', this.state.nombstation);
    form.append('workShift', this.state.workShift);
    form.append('pump', this.state.pump);
    form.append('hose', this.state.hose);
    fetch('http://189.194.249.170:83/atsem/url/ticket/guardaTicket.php', {
      method: 'POST',
      body: form,
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({ data: response, isLoading: false });
        this.printTicket();
      })
      .catch((errors) => {
        this.setState({ isLoading: false });
        Alert.alert(`Algo salio mal al guardar el registro: ${errors}`);
      });
    return true;
  };

  headText = () => (
    <View style={styles.container}>
      {this.state.selectedPrinter && <View style={styles.container} />}
      <TouchableOpacity style={styles.button}>
        <Text style={{ color: 'white' }}>INGRESA LOS DATOS DEL TICKET</Text>
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
      <Button style={styles.button}>
        <Text>SELECCIONA UNA IMPRESORA</Text>
      </Button>
    </View>
  );

  customOptions2 = () => (
    <View style={styles.container}>
      <Button style={styles.button}>
        <Text style={{ color: 'white' }}>SELECCIONA DATOS DE ESTACIÓN</Text>
      </Button>
    </View>
  );

  updateSatet = (name, text) => {
    this.setState({
      [name]: text,
    });
    console.log(this.state);
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={this.isIos ? 'padding' : ''}
        keyboardVerticalOffset={this.isIos ? 44 : 0}
      >
        <SafeAreaView>
          <ScrollView>
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
                placeholder="Litros"
                keyboardType="numeric"
                returnKeyType="next"
                style={styles.inputStyle}
                onChangeText={(text) => this.updateSatet('liters', text)}
                value={this.state.liters}
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
              {Platform.OS === 'android' && this.customOptions2()}
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
              <Picker
                mode="dropdown"
                iosHeader="Turno"
                iosIcon={<Icon name="arrow-down" />}
                style={styles.pickerStyle}
                selectedValue={this.state.workShift}
                onValueChange={(itemValue) => this.setState({ workShift: itemValue })}
              >
                <Picker.Item label="Selecciona Turno" value="" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
              </Picker>
              <Picker
                mode="dropdown"
                iosHeader="Manguera"
                iosIcon={<Icon name="arrow-down" />}
                style={styles.pickerStyle}
                selectedValue={this.state.hose}
                onValueChange={(itemValue) => this.setState({ hose: itemValue })}
              >
                <Picker.Item label="Selecciona Manguera" value="" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="11" value="11" />
                <Picker.Item label="12" value="12" />
              </Picker>
              <TouchableOpacity
                rounded
                style={styles.button}
                onPress={this.insertData}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  {this.state.isLoading ? 'Enviando datos...' : 'Imprimir'}
                </Text>
                {this.state.isLoading && (
                  <ActivityIndicator style={{ marginLeft: 32 }} color="white" />
                )}
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
