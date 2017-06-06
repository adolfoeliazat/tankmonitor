import React, { 
    Component 
} from 'react';
import { 
    Platform, 
    Text, 
    Linking 
} from 'react-native';

class Validate extends Component {
  static navigationOptions = { // A
    title: 'Validate',
  };

componentDidMount() { // B
    console.log('****************************************************************************');
  if (Platform.OS === 'android') {
    console.log('****************************************************************************');
    console.log(url);
    Linking.getInitialURL().then(url => {
      this.navigate(url);
    });
  } else {
      console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++');
      Linking.addEventListener('url', this.handleOpenURL);
    }
  }
  
  componentWillUnmount() { // C
      console.log('ccccccccccccccccccccccccccccccccccccccccccccccccccccc');
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = (event) => { // D
      console.log('ddddddddddddddddddddddddddddddddddddddddddddd');
    this.navigate(event.url);
  }

  navigate = (url) => { // E
      console.log('****************************************************************************');
    const { navigate } = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, '');
    //const id = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName = route.split('/')[0];

    console.log('am i here???????????????');
    console.log(routeName);
    if (routeName === 'validate') {
      navigate('ForgotPassword')
    };
  }

  render() {
    return <Text>Hello from Home!</Text>;
  }
}

export default Validate;
