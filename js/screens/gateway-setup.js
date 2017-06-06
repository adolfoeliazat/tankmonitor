import React, { 
    Component 
} from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet
} from 'react-native';
import {
  StackNavigator
} from 'react-navigation';

import STYLES from './../components/common-styles';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: '#000020',
        //justifyContent: 'center'
    },
    white: {
        color: '#FFFFFF'
    }
})

class GatewaySetup extends Component {
    static navigationOptions = {header: null};

    constructor() {
        super();
        this.state = {
            gatewayName: '',
            gatewayId: '',
            location: ''
        }
    }

    render() {
        return (
            <View style={styles.background}>
                <Text style={styles.white}>Gateway Setup</Text>
                <TextInput 
                    style={STYLES.inputField}
                    onChangeText = {(text) => this.setState({gatewayName: text})} 
                    placeholder='Gateway Name' />
                <TextInput 
                    style={STYLES.inputField}
                    onChangeText = {(text) => this.setState({gatewayId: text})} 
                    placeholder='Gateway ID' />
                <TextInput 
                    style={STYLES.inputField}
                    onChangeText = {(text) => this.setState({location: text})} 
                    placeholder='Location' />
            </View>
        );
    }
}

module.exports = GatewaySetup;
