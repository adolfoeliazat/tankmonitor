import React, { 
    Component 
} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  StackNavigator
} from 'react-navigation';
import Hr from 'react-native-hr';
import TouchButton from '../components/Button/index';
import TextBox from '../components/TextBox/index';
import STYLES from './../components/common-styles';

class SensorSetup extends Component {
  static navigationOptions = {header: null};

  constructor() {
    super();
    this.state = {
      sensorName: '',
      sensordId: '',
      min: '',
      max: '',
      unit: '',
      location: ''
    };
    this.addSensor = this.addSensor.bind(this);
  }

  addSensor = () => {
    const { navigate } = this.props.navigation;

    let {
      sensorName,
      sensordId,
      min,
      max,
      unit,
      location
    } = this.state


    navigate('Status');

    // Add sensor POST call here
  }

  render() {
    return (
      <View style={STYLES.background}>
            <View style={{
                flex: .05,
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                margin: 5
            }}>
                <Text style={[STYLES.white, STYLES.textHeader ]}>SET UP SENSOR</Text>
            </View>
            <View style={{
                flex: 0.05
            }}>
                <Text style={{
                    color: 'white',
                    position: 'absolute',
                    left: 0
                }}>Sensor Setup</Text>
                <Text style={{
                    color: 'steelblue',
                    position: 'absolute',
                    right: 0
                }}>View Intructions</Text>
            </View>

            <Hr lineColor='#b3b3b3' textColor='steelblue' />


            <View style={{
                flex: 0.75
            }}>
                <TextBox
                  style={{height: 45}}
                  onChangeText = {(text) => this.setState({sensorName: text})}
                  placeholder='Sensor Name' />
                <TextBox
                  style={{height: 45}}
                  onChangeText = {(text) => this.setState({sensordId: text})} 
                  placeholder='Sensor ID' />
                <TextBox
                  style={{height: 45}}
                  onChangeText = {(text) => this.setState({min: text})} 
                  placeholder='Min' />
                <TextBox
                  style={{height: 45}}
                  onChangeText = {(text) => this.setState({max: text})} 
                  placeholder='Max' />
                <TextBox
                  style={{height: 45}}
                  onChangeText = {(text) => this.setState({unit: text})} 
                  placeholder='Unit' />
                <TextBox
                  style={{height: 45}}
                  onChangeText = {(text) => this.setState({location: text})} 
                  placeholder='Location' />
            </View>

            <View style={{flex:0.15}}>
                <TouchButton
                    title = 'Add Sensor'
                    onPress = {() => {this.addSensor()}}
                    activeOpacity={0.8}
                    style={{backgroundColor: '#5CB85C'}}>
                        ADD
                </TouchButton>
            </View>
      </View>
    )
  }
}

module.exports = SensorSetup;
