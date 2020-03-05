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
      costo: null,
      fch: null,
      hr: null,
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
      numUni,
      placa,
      conductor,
      km,
      nombstation,
      liters,
      hose,
    } = this.state;
    const hra = moment().format('LTS');
    const page = `
      <div>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400&display=swap');
        body {
          margin: 0 auto;
          font-family: "Roboto Mono", sans-serif;
          width: 8cm;
          font-size: 12px;
        }
        .logo {
          width: 200px;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
        .address {
          margin-top: 16px;
          text-align: center;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .folio {
          text-align: center
        }
        .service {
        }
        .service__date-time,
        .service__dispatchers,
        .products_item,
        .total {
          display: flex;
          justify-content: space-between;
        }
        .bordered {
          border-top: 1px dashed black;
          padding: 8px 0px;
        }
      </style>
      <div>
      <img
        class="logo"
        src="http://189.194.249.170:83/atsem/url/iter-gas-natural-1.png"
      />
      <div class="address">
        Boulevard Alfredo del Mazo No. 522, Col. San Lorenzo Tepatitl&aacute;n,
        Toluca, Estado de M&eacute;xico, C.P. 50010.
      </div>
      <div class="folio bordered">
        Documento No. T-000 <br />
        ${nombstation}
      </div>
      <div class="service bordered">
        <div class="service__date-time">
          <span>Fecha: ${fech}</span>
          <span>Hora: ${hra}</span>
        </div>
        <div class="service__dispatchers">
          <span>Bomba: ${pump}</span>
          <span>Turno: ${workShift}</span>
        </div>
        <div class="service_employee">
          Manguera: ${hose}
        </div>
        <div class="service_employee">
          Atendido por: ${this.props.user.fullName.toUpperCase()}
        </div>
      </div>
      <div class="client bordered">
        <div>Cliente: ${conductor}</div>
        <div>Placa: ${placa}</div>
        <div>No. Unidad: ${numUni}</div>
        <div>Kilometros: ${km}</div>
      </div>
      <div class="products bordered">
        <div class="products_item">
          <span>Producto:</span>
          <span>GNV</span>
        </div>
        <div class="products_item">
          <span>Cantidad:</span>
          <span>${liters} (L)</span>
        </div>
        <div class="products_item">
          <span>PVP:</span>
          <span>$10.00</span>
        </div>
      </div>
      <div class="total bordered">
        <span>Total:</span>
        <span>${liters * 10.0}</span>
      </div>
    </div>
      </div>`;
    RNPrint.print({
      html: page,
    }).then(() => {});
    this.clearInput();
  };

  validateBeforeInsert = () => {
    const fields = ['numUni', 'placa', 'conductor', 'km', 'costo'];
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
      <Button style={styles.button} onPress={this.selectPrinter}>
        <Text>SELECCIONA UNA IMPRESORA</Text>
      </Button>
    </View>
  );

  updateSatet = (name, text) => {
    this.setState({
      [name]: text,
    });
  };

  render() {
    return (
      <KeyboardAvoidingView enabled>
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

        <ScrollView style={{ height: '100%' }}>
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
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps)(Home);
