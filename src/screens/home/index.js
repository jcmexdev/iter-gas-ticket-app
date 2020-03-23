import React, { Component } from 'react';
import {
  Platform, Text, View, ActivityIndicator, Alert
} from 'react-native';
import RNPrint from 'react-native-print';
import moment from 'moment';
import { Autocomplete } from 'react-native-dropdown-autocomplete';
import {
  Icon,
  Picker,
  Header,
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
import { STORE_TICKET } from '../../utils/api';
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
      errors_liters: null,
      errors_kilometers: null,
    };

    this.state = this.initialstate;
  }

  clearInput = () => {
    this.setState(this.initialstate);
    this.autocompletePlate.clearInput();
    this.autocompleteDriver.clearInput();
  };

  selectPrinter = async () => {
    const selectedPrinter = await RNPrint.selectPrinter({ x: 100, y: 100 });
    this.setState({ selectedPrinter });
  };

  printTicket = () => {
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
        <div>Kilómetros: ${km}</div>
        <div>Rendimiento: ${this.state.data.performance}</div>
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
    const liters = this.state.errors_liters;
    const kilometers = this.state.errors_kilometers;
    if (liters != null || kilometers != null) {
      Alert.alert(
        '!Datos incorrectos¡',
        'Tienes algún dato incorrecto, revisa la información e intenta de nuevo.'
      );
      return false;
    }
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

  insertData = async () => {
    this.handleLiters();
    this.handleLiters();
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

    const response = await STORE_TICKET(
      this.state,
      fech,
      hra,
      this.props.user.fullName
    );

    if (response.status === 200) {
      this.setState({ data: response, isLoading: false });
      this.printTicket();
    } else {
      this.setState({ isLoading: false });
    }

    return true;
  };

  customOptions = () => (
    <View style={styles.container}>
      {this.state.selectedPrinter && (
        <View style={styles.container}>
          <Text>{`Impresora seleccionada: ${this.state.selectedPrinter.name}`}</Text>
          <Text>{`Dirección: ${this.state.selectedPrinter.url}`}</Text>
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

  updateState = (name, text) => {
    this.setState({
      [name]: text,
    });
  };

  handleKilometers = () => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(this.state.km)) {
      this.setState({
        errors_kilometers: ' *DEBE SER UN NÚMERO VÁLIDO',
      });
    } else if (this.state.km < 1) {
      this.setState({
        errors_kilometers: ' *DEBE SER MAYOR O IGUAL A 1.0',
      });
    } else {
      this.setState({
        errors_kilometers: null,
      });
    }
  };

  handleLiters = () => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(this.state.liters)) {
      this.setState({
        errors_liters: ' *DEBE SER UN NÚMERO VÁLIDO',
      });
    } else if (this.state.liters < 1) {
      this.setState({
        errors_liters: ' *DEBE SER MAYOR O IGUAL A 1.0',
      });
    } else {
      this.setState({
        errors_liters: null,
      });
    }
  };

  render() {
    return (
      <Container>
        <Header
          style={{ backgroundColor: '#ed6c1c' }}
          androidStatusBarColor="black"
        >
          <Body>
            <Text style={{ color: 'white', fontSize: 22 }}>Tickets</Text>
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
              <Text style={{ color: 'white' }}>Salir</Text>
            </Button>
          </Right>
        </Header>

        <Content style={{ paddingHorizontal: 16 }}>
          {Platform.OS === 'ios' && this.customOptions()}
          <Label style={styles.title}>INGRESA LA INFORMACIÓN DEL TICKET</Label>
          <Label style={styles.label}>NÚMERO DE UNIDAD</Label>

          <Item style={styles.item} rounded>
            <Input
              placeholder="Número de unidad"
              autoCapitalize="characters"
              returnKeyType="next"
              /* eslint no-underscore-dangle: ["error", { "allow": ["_root"] }] */
              onSubmitEditing={() => this.inputPlate._root.focus()}
              onChangeText={(text) => this.updateState('numUni', text)}
              value={this.state.numUni}
            />
          </Item>
          <Label style={styles.label}>NÚMERO DE PLACA</Label>
          <Autocomplete
            ref={(el) => {
              this.autocompletePlate = el;
            }}
            placeholder="Placa"
            inputContainerStyle={styles.autocomplete}
            inputStyle={{
              paddingLeft: 10,
              borderWidth: 0,
              width: '80%',
            }}
            data={this.props.plates}
            handleSelectItem={(item) => this.setState({ placa: item.plate })}
            valueExtractor={(item) => item.plate}
            noDataText="No se encontró la placa"
          />

          <Label style={styles.label}>NOMBRE DEL CONDUCTOR</Label>
          <Autocomplete
            ref={(el) => {
              this.autocompleteDriver = el;
            }}
            placeholder="Nombre del conductor"
            inputContainerStyle={styles.autocomplete}
            inputStyle={{
              paddingLeft: 10,
              borderWidth: 0,
              width: '80%',
            }}
            data={this.props.drivers}
            handleSelectItem={(item) => this.setState({ conductor: item.full_name })}
            valueExtractor={(item) => item.full_name}
            noDataText="No se encontró la placa"
          />

          <Label
            style={[styles.label, this.state.errors_kilometers && styles.error]}
          >
            KILOMETRAJE
            {' '}
            {this.state.errors_kilometers}
          </Label>
          <Item
            style={styles.item}
            rounded
            error={this.state.errors_kilometers && true}
          >
            <Input
              placeholder="Kilometraje"
              keyboardType="numeric"
              returnKeyType="next"
              ref={(input) => {
                this.inputKilometers = input;
              }}
              /* eslint no-underscore-dangle: ["error", { "allow": ["_root"] }] */
              onSubmitEditing={() => this.inputLiters._root.focus()}
              onEndEditing={this.handleKilometers}
              onChangeText={(text) => this.updateState('km', text)}
              value={this.state.km}
            />
          </Item>

          <Label
            style={[styles.label, this.state.errors_liters && styles.error]}
          >
            CANTIDAD DE LITROS
            {' '}
            {this.state.errors_liters}
          </Label>
          <Item
            rounded
            style={styles.item}
            error={this.state.errors_liters && true}
          >
            <Input
              placeholder="Litros"
              keyboardType="numeric"
              returnKeyType="next"
              ref={(input) => {
                this.inputLiters = input;
              }}
              onChangeText={(text) => this.updateState('liters', text)}
              onEndEditing={this.handleLiters}
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
  drivers: state.drivers,
  plates: state.plates,
  user: state.user,
});
export default connect(mapStateToProps)(Home);
