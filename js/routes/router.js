import {
    AppRegistry,
    Text
} from 'react-native';
import {
    StackNavigator
} from 'react-navigation';

import SCREENS from './../screens/index';

export default ROUTES = StackNavigator({
  Login: {screen: SCREENS.LoginScreen},
  ForgotPassword: {screen: SCREENS.ForgotPassword},
  GatewaySetup: {screen: SCREENS.GatewaySetup},
  SensorSetup: {screen: SCREENS.SensorSetup},
  Status: {screen: SCREENS.Status}
});
