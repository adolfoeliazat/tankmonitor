import React, { 
    Component 
} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Linking,
  Navigator,
  Platform
} from 'react-native';
import {
  StackNavigator
} from 'react-navigation';
import DeepLinking from 'react-native-deep-linking';
import _ from 'lodash';

import {
    TouchButton,
    TextBox,
    ModalBox
} from './../components/index';

import {createIconSetFromFontello} from 'react-native-vector-icons';
import config from '../config/config.json';
let Icon = createIconSetFromFontello(config);

import authService from '../lib/authentication';
import CONFIG from '../config/index';
import STYLES from '../components/common-styles';

class LoginScreen extends Component{
    static navigationOptions = {header: null};

    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            modalVisible: false
        };
        this.cayenneLogin = this.cayenneLogin.bind(this);
        this.cayenneApi = _.debounce(this.cayenneApi.bind(this), 1000, {leading: true});
        CONFIG.session.access_token = '';
        CONFIG.session.refresh_token = '';
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            Linking.getInitialURL().then(url => {
                this.navigate(url);
            });
        } else Linking.addEventListener('url', this.handleOpenURL);
    }

    componentWillUnmount() { Linking.removeEventListener('url', this.handleOpenURL); }

    handleOpenURL = (event) => { this.navigate(event.url); }

    navigate = (url) => {
        const { navigate } = this.props.navigation;
        if (_.isNil(url)) return;
        const route = url.replace(/.*?:\/\//g, '');
        const routeName = route.split('/')[0];
        var accessToken = routeName.match(/access_token=(.*?)&/i)[1];
        var state = routeName.match(/state=(.*)/i)[1];

        if (_.isNil(accessToken) || _.isNil(state)) return;

        if (state.toString() !== CONFIG.settings.state) {
            console.log('Wrong state received!');
            return;
        }
        CONFIG.session.access_token = accessToken;
        navigate('GatewaySetup');
    }

    /**
     * Cayenne API Login using app id
     * This will redirect to the authorization page and will use the redirect link provdided
     * This is using implicit flow and deep linking to return to app with access token
     */
    cayenneApi =() => {

        // const { navigate } = this.props.navigation;
        // navigate('GatewaySetup');

        CONFIG.settings.state = CONFIG.settings.guid();

        Linking.openURL(CONFIG.settings.getLoginUri())
            .then(supported => {})
            .catch(err => console.error('Error: ', err));
    }

    /**
     * Standard Cayenne login using email/password
     */
    cayenneLogin = () => {
        const { navigate } = this.props.navigation;
        const { username, password, modalVisible } = this.state;
        var vm = this;
        var email = username.trim();

        authService.getToken(email, password).then(function(response) {
            if (response.statusCode >= 400) vm.setState({ modalVisible: true });
            CONFIG.session.access_token = response.access_token;
            CONFIG.session.refresh_token = response.refresh_token;
            navigate('GatewaySetup');
        }).catch(function (error) {
            alert(error.message);
        });
    }

    render(){
        const {navigate} = this.props.navigation;
        return(
                <Image style={STYLES.backgroundImageContainer} source={CONFIG.images.loginSplash}>
                    <ModalBox
                        onRequestClose={() => navigate('Login')}
                        isVisible={this.state.modalVisible}
                        modalText='Wrong email or password!'
                        title='OK'
                        onPress={() => {this.setState({modalVisible: false})}}
                        buttonText='OK'>
                    </ModalBox>

                    <View style={{flex:0.05}}/>
                    <View style={{flex:1, justifyContent:'flex-start'}}>
                        <Image style={{margin:50, backgroundColor:'transparent'}} source={CONFIG.images.logo}/>

                        <TextBox
                            onChangeText={(text) => this.setState({username: text})}
                            placeholder = 'Username'/>
                        <TextBox
                            onChangeText={(text) => this.setState({password: text})}
                            placeholder = 'Password'
                            secureTextEntry={true}/>

                        <TouchButton
                            title = 'Sign In'
                            onPress = {() => {this.cayenneLogin()}}
                            activeOpacity={0.8}>
                                Sign In
                        </TouchButton>

                        <TouchableOpacity 
                            onPress = {() => navigate('ForgotPassword')}
                            title = "Forgot Passord?"><Text style={STYLES.linkText}>Forgot password?</Text>
                        </TouchableOpacity>

                        <View style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: 10
                        }}>                        
                            <Icon.Button name="cayenne" color="#5bc0de" backgroundColor='#FFFFFF' onPress = {() => {this.cayenneApi()}}>
                                <Text style={{fontFamily: 'Arial', fontSize: 15}}>Login with `Your Cayenne App Name`</Text>
                            </Icon.Button>
                        </View>
                    </View>
                    <View style={{flex:0.05}}/>
                </Image>
        );
    }
}

module.exports = LoginScreen;
