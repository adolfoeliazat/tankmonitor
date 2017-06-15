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
    ModalBox,
    CommonStyles
} from './../components/index';
import {
    AuthService,
    PlatformService
} from './../lib/index';
import {
    SESSION,
    SETTINGS,
    IMAGES
} from './../config/index';

import {createIconSetFromFontello} from 'react-native-vector-icons';
import config from '../config/config.json';
let Icon = createIconSetFromFontello(config);

class LoginScreen extends Component{
    static navigationOptions = {header: null};

    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            modalVisible: false
        };
        this.cayenneLogin = _.debounce(this.cayenneLogin.bind(this));
        this.cayenneApi = _.debounce(this.cayenneApi.bind(this), 1000, {leading: true});
        this.getThings = this.getThings.bind(this);
        SESSION.access_token = '';
        SESSION.refresh_token = '';
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
        var vm = this;
        const { navigate } = this.props.navigation;
        if (_.isNil(url)) return;
        const route = url.replace(/.*?:\/\//g, '');

        const routeName = route.split('/')[0];
        // Implicit login: #
        // Explicit login: ?
        var loginType = (!_.isNil(routeName.match(/(.*?)#/i))) ? routeName.match(/(.*?)#/i)[1] : 'explicit';
        var state = routeName.match(/state=(.*)/i)[1];

        if (_.isNil(state)) return;

        if (state.toString() !== SETTINGS.state) return;

        if (loginType === 'implicit') {
            SESSION.access_token = routeName.match(/access_token=(.*?)&/i)[1];
            if(_.isNil(SESSION.access_token)) return; 
            vm.getThings();
        }
        // Sample app usage only, use implicit login with mobile apps
        else {
            var authCode = routeName.match(/code=(.*?)&/i)[1];
            if(_.isNil(authCode)) return;
            AuthService.getOauth(authCode).then(function(response) {
                if (_.isEmpty(response)) return;
                SESSION.access_token = response.access_token;
                SESSION.refresh_token = response.refresh_token;
                vm.getThings();
            });
        }
    }

    /**
     * Cayenne API Login using app id
     * This will redirect to the authorization page and will use the redirect link provdided
     */
    cayenneApi =(loginType) => {
        SETTINGS.state = SETTINGS.guid();
        var loginUrl = (loginType === 'implicit') ? SETTINGS.getImplicitLogin() : SETTINGS.getExplicitLogin();
        Linking.openURL(loginUrl)
            .then(supported => {})
            .catch(err => console.error('Error: ', err));
    }

    /**
     * Standard Cayenne login using email & password
     */
    cayenneLogin = () => {
        var vm = this;
        const { username, password, modalVisible } = this.state;
        var email = username.trim();

        if (email.search('@') === -1 || email === '' || password === '') return;

        AuthService.getToken(email, password).then(function(response) {
            if (response.statusCode >= 400) {
                vm.setState({ modalVisible: true });
                return;
            }
            SESSION.access_token = response.access_token;
            SESSION.refresh_token = response.refresh_token;
            vm.getThings();
        }).catch(function (error) {
            alert(error.message);
        });
    }

    getThings = () => {
        var vm = this;
        const { navigate } = this.props.navigation;

        PlatformService.getThings().then(function(response) {
            if (response.statusCode >= 400) return;
            if (_.isEmpty(response)) return navigate('GatewaySetup');
            return navigate('Status');
        })
    }

    render(){
        const {navigate} = this.props.navigation;
        return(
                <Image style={CommonStyles.backgroundImageContainer} source={IMAGES.loginSplash}>
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
                        <Image style={{margin:50, backgroundColor:'transparent'}} source={IMAGES.logo}/>

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
                            title = "Forgot Passord?"><Text style={CommonStyles.linkText}>Forgot password?</Text>
                        </TouchableOpacity>

                        <View style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: 10
                        }}>
                            <Icon.Button name="cayenne" color="#5bc0de" backgroundColor='#FFFFFF' onPress = {() => {this.cayenneApi('implicit')}}>
                                <Text style={{fontFamily: 'Arial', fontSize: 15}}>Cayenne oAuth2 Implicit Login</Text>
                            </Icon.Button>
                        </View>

                        <View style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: 20
                        }}>
                            <Icon.Button name="cayenne" color="#5bc0de" backgroundColor='#FFFFFF' onPress = {() => {this.cayenneApi('explicit')}}>
                                <Text style={{fontFamily: 'Arial', fontSize: 15}}>Cayenne oAuth2 Explicit Login</Text>
                            </Icon.Button>
                        </View>
                    </View>
                    <View style={{flex:0.05}}/>
                </Image>
        );
    }
}

module.exports = LoginScreen;
