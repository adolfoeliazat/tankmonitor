import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import LoginScreen from './screens/login-screen';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (<View><Text>Hello, Navigation!</Text><Button onPress={() => navigate('Login')} title="Click me!"/></View>);
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Login: {screen: LoginScreen}
});

AppRegistry.registerComponent('tankmonitor', () => SimpleApp);