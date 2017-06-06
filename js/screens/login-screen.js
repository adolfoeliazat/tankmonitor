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
  StyleSheet,
  Linking,
  Navigator,
  Platform
} from 'react-native';
import {
  StackNavigator
} from 'react-navigation';
import DeepLinking from 'react-native-deep-linking';
import _ from 'lodash';

import TouchButton from '../components/Button/index';
import authService from '../lib/authentication';
import CONFIG from '../config/index';
import STYLES from '../components/common-styles';

const styles = StyleSheet.create({
    linkText: {
        marginTop:1,
        padding:5,
        textAlign:'center',
        backgroundColor: 'transparent',
        fontSize:16,
        color:'white',
        textDecorationLine:'underline',
        textDecorationStyle:'solid'
    },
    backgroundImageContainer:{
        flex: 1,
        resizeMode:'stretch',
        width: undefined,
        height: undefined,
        backgroundColor: 'transparent',
        justifyContent: 'center'
    },
    modalText:{
        marginLeft:10,
        marginRight:10,
        marginTop:5,
        marginBottom:2,
        padding:15,
        textAlign:'center',
        fontSize:24,
        color:'black'
    }
    });

class LoginScreen extends Component{
    static navigationOptions = {header: null};

    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            modalVisible: false
        };
        this.setModalVisible = this.setModalVisible.bind(this);
        this.cayenneLogin = this.cayenneLogin.bind(this);
        this.cayenneApi = this.cayenneApi.bind(this);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
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
        const route = url.replace(/.*?:\/\//g, '');
        const routeName = route.split('/')[0];
        var accessToken = routeName.match(/access_token=(.*?)&/i)[1];
        var state = routeName.match(/state=(.*)/i)[1];

        if (_.isNil(accessToken) || _.isNil(state)) return;

        if (state.toString() !== CONFIG.settings.state) {
            console.log('Wrong state received!');
            return;
        }
        console.log(accessToken);
        navigate('GatewaySetup');
    }

    /**
     * Cayenne API Login using APP Key
     */
    cayenneApi =() => {
        // Create state value
        CONFIG.settings.state = CONFIG.settings.guid();

        Linking.openURL(CONFIG.settings.getLoginUri())
            .then(supported => {
                if (!supported) { console.log('Not supported: ' + url); }
                else return Linking.openURL(CONFIG.settings.getLoginUri());
            }).catch(err => console.error('Error: ', err));
    }

    /**
     * Standard Cayenne login
     */
    cayenneLogin = () => {
        const { navigate } = this.props.navigation;
        const { username, password} = this.state;
        const { setModalVisible } = this.setModalVisible;

        var email = username.trim();
        authService.getToken(email, password).then(function(response) {
            if (response.statusCode === 400) console.log('Wrong email/password');
            else {
                console.log('Success!');
            }
        }).catch(function (error) {
            console.log('API error');
            alert(error.message);
        });
    }

    render(){
        const {navigate} = this.props.navigation;
        return(
                <Image style={styles.backgroundImageContainer} source={CONFIG.images.loginSplash}>
                    <Modal
                        onRequestClose={() => navigate('ForgotPassword')}
                        animationType={'fade'}
                        transparent={true}
                        visible={this.state.modalVisible} style={{justifyContent:'center', alignItems:'center'}}>
                        <View style={{flex:0.3, backgroundColor:'#000A'}}/>
                        <View style={{backgroundColor:'#000A', flex:0.3}}>
                            <View style={{paddingBottom:20, margin:20, justifyContent:'center', alignItems:'center', backgroundColor:'white', borderRadius:5}}>
                                <View>
                                    <Text style={styles.modalText}>Wrong Username/Password!</Text>

                                    <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible)}}>
                                        <Text style={styles.buttonText}>OK</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{flex:0.4, backgroundColor:'#000A'}}/>
                    </Modal>

                    <View style={{flex:0.05}}/>
                    <View style={{flex:0.4, justifyContent:'flex-start'}}>
                        <Image style={{margin:50, backgroundColor:'transparent'}} source={CONFIG.images.logo}/>
                        
                        <TextInput style={STYLES.inputField} onChangeText={(text) => this.setState({username: text})} placeholder='Username' />
                        <TextInput secureTextEntry={true} style={STYLES.inputField} onChangeText={(text) => this.setState({password: text})} placeholder='Password' />

                        <TouchButton
                            title = 'Sign In'
                            onPress = {() => {this.cayenneLogin()}}
                            activeOpacity={0.8}>
                                Sign In
                        </TouchButton>

                        <TouchButton
                            title = 'Cayenne API Login'
                            onPress = {() => {this.cayenneApi()}}
                            activeOpacity={0.8}
                            image={CONFIG.images.appIcon}
                            style={{ backgroundColor: '#5cb85c' }}>
                                Cayenne API Login
                        </TouchButton>

                        <TouchableOpacity 
                            onPress = {() => navigate('ForgotPassword')}
                            title = "Forgot Passord?"><Text style={styles.linkText}>Forgot password?</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{flex:0.5}}/>
                </Image>
        );
    }
}

module.exports = LoginScreen;
