import React, { Component } from 'react';
import {
  Platform, Text, View, ActivityIndicator, Alert
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
  Container,
  Content,
  Input,
  Item,
  Label,
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
    console.log(this.state);
    const {
      numUni,
      placa,
      conductor,
      km,
      nombstation,
      liters,
      hose,
      pump,
      workShift,
    } = this.state;
    const fech = moment().format('L');
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
        Documento No. T-${this.state.data.id
      .toString()
      .padStart('6', '0')} <br />
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
        <span>$${Number.parseFloat(liters * 10.0).toFixed(2)}</span>
      </div>
    </div>
      </div>`;
    RNPrint.print({
      html: page,
    }).then(() => {});
    this.clearInput();
  };

  validateBeforeInsert = () => {
    const fields = ['numUni', 'placa', 'conductor', 'km', 'hose', 'workShift'];
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
    form.append('date', fech);
    form.append('time', hra);
    form.append('dispatcher', this.props.user.fullName);
    form.append('station', this.state.nombstation);
    form.append('work_shift', this.state.workShift);
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
        console.log(errors);
        Alert.alert(`Algo salio mal al guardar el registro: ${errors}`);
      });
    return true;
  };

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
  };

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Text>Tickets</Text>
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
              <Text style={{ color: 'white' }}>Cerrar sesión</Text>
            </Button>
          </Right>
        </Header>

        <Content style={{ paddingHorizontal: 16 }}>
          {Platform.OS === 'ios' && this.customOptions()}
          <Label style={styles.title}>INGREA LA INFORMACIÓN DEL TICKET</Label>
          <Label style={styles.label}>NÚMERO DE UNIDAD</Label>

          <Item style={styles.item} rounded>
            <Input
              placeholder="Número de unidad"
              autoCapitalize="characters"
              returnKeyType="next"
              /* eslint no-underscore-dangle: ["error", { "allow": ["_root"] }] */
              onSubmitEditing={() => this.inputPlate._root.focus()}
              onChangeText={(text) => this.updateSatet('numUni', text)}
              value={this.state.numUni}
            />
          </Item>
          <Label style={styles.label}>NÚMERO DE PLACA</Label>
          <Item style={styles.item} rounded>
            <Input
              rounded
              placeholder="Placa"
              autoCapitalize="characters"
              returnKeyType="next"
              ref={(input) => {
                this.inputPlate = input;
              }}
              /* eslint no-underscore-dangle: ["error", { "allow": ["_root"] }] */
              onSubmitEditing={() => this.inputDriverName._root.focus()}
              onChangeText={(text) => this.updateSatet('placa', text)}
              value={this.state.placa}
            />
          </Item>

          <Label style={styles.label}>NOMBRE DEL CONDUCTOR</Label>
          <Item style={styles.item} rounded>
            <Input
              placeholder="Nombre Conductor"
              autoCapitalize="characters"
              returnKeyType="next"
              ref={(input) => {
                this.inputDriverName = input;
              }}
              /* eslint no-underscore-dangle: ["error", { "allow": ["_root"] }] */
              onSubmitEditing={() => this.inputKilometers._root.focus()}
              onChangeText={(text) => this.updateSatet('conductor', text)}
              value={this.state.conductor}
            />
          </Item>

          <Label style={styles.label}>KILOMETRAJE</Label>
          <Item style={styles.item} rounded>
            <Input
              placeholder="Kilometraje"
              keyboardType="numeric"
              returnKeyType="next"
              ref={(input) => {
                this.inputKilometers = input;
              }}
              /* eslint no-underscore-dangle: ["error", { "allow": ["_root"] }] */
              onSubmitEditing={() => this.inputLiters._root.focus()}
              onChangeText={(text) => this.updateSatet('km', text)}
              value={this.state.km}
            />
          </Item>

          <Label style={styles.label}>CANTIDAD DE LITROS</Label>
          <Item style={styles.item} rounded>
            <Input
              placeholder="Litros"
              keyboardType="numeric"
              returnKeyType="next"
              ref={(input) => {
                this.inputLiters = input;
              }}
              onChangeText={(text) => this.updateSatet('liters', text)}
              value={this.state.liters}
            />
          </Item>
          <Label style={styles.label}>ESTACIÓN DE SERVICIO</Label>
          <Item rounded>
            <Picker
              mode="dropdown"
              iosHeader="Selecciona una estación"
              iosIcon={<Icon name="arrow-down" />}
              selectedValue={this.state.nombstation}
              onValueChange={(itemValue) => this.setState({ nombstation: itemValue })}
            >
              <Picker.Item label="Toluca" value="Toluca" />
              <Picker.Item label="Rayon" value="Rayon" />
              <Picker.Item label="Zinacantepec" value="Zinacantepec" />
            </Picker>
          </Item>

          <Label style={styles.label}>SELECCIONA EL TURNO</Label>
          <Item rounded>
            <Picker
              mode="dropdown"
              iosHeader="Turno"
              iosIcon={<Icon name="arrow-down" />}
              selectedValue={this.state.workShift}
              onValueChange={(itemValue) => this.setState({ workShift: itemValue })}
            >
              <Picker.Item label="Selecciona un turno" value="" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
            </Picker>
          </Item>

          <Label style={styles.label}>SELECCIONA LA MANGUERA</Label>
          <Item rounded>
            <Picker
              mode="dropdown"
              iosHeader="Manguera"
              iosIcon={<Icon name="arrow-down" />}
              selectedValue={this.state.hose}
              onValueChange={(itemValue) => this.setState({ hose: itemValue })}
            >
              <Picker.Item label="Selecciona una Manguera" value="" />
              <Picker.Item label="1" value={1} />
              <Picker.Item label="2" value={2} />
              <Picker.Item label="3" value={3} />
              <Picker.Item label="4" value={4} />
              <Picker.Item label="5" value={5} />
              <Picker.Item label="6" value={6} />
              <Picker.Item label="7" value={7} />
              <Picker.Item label="8" value={8} />
              <Picker.Item label="9" value={9} />
              <Picker.Item label="10" value={10} />
              <Picker.Item label="11" value={11} />
              <Picker.Item label="12" value={12} />
            </Picker>
          </Item>
          <Button
            full
            rounded
            onPress={this.insertData}
            style={styles.sendButton}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {this.state.isLoading ? 'Enviando datos...' : 'Imprimir ticket'}
            </Text>
            {this.state.isLoading && (
              <ActivityIndicator style={{ marginLeft: 32 }} color="white" />
            )}
          </Button>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps)(Home);
