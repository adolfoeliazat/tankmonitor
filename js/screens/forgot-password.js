import React, { 
    Component 
} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import _ from 'lodash';

import TouchButton from '../components/Button/index';
import TextBox from '../components/TextBox/index';
import authService from '../lib/authentication';
import CONFIG from '../config/index';
import STYLES from '../components/common-styles';

class ForgotPassword extends Component {
    static navigationOptions = {header: null};

    constructor() {
        super();
        this.state = {
            email: ''
        };
        this.forgotPassword = this.forgotPassword.bind(this);
    }

    forgotPassword = () => {
        const {navigate } = this.props.navigation;
        const { email } = this.state;

        // authService.forgotPassword(email.trim()).then(function(response) {
        //     if (!_.isEmpty(response)) {
        //         console.log(response);
        //     }
        // }).catch(function(error) {
        //     console.log('API error');
        //     alert(error.message);
        // })
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
                <Image style={STYLES.backgroundImageContainer} source={CONFIG.images.loginSplash}>
                    <View style={{
                        flex: 0.5,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image style={{margin:40, backgroundColor:'transparent'}} source={CONFIG.images.logo}/>
                        <Text style={STYLES.screenText}>Forgot your password?</Text>
                        <Text style={STYLES.screenText}>Enter your email address below and we'll send you instructions for how to reset your password</Text>
                    </View>

                    <View style={{flex:0.5}}>
                        <TextBox
                            style={{height: 45}}
                            onChangeText = {(text) => this.setState({email: text})} 
                            placeholder='Email' />

                        <TouchButton
                            title = 'Send Link'
                            onPress = {() => {this.forgotPassword()}}
                            activeOpacity={0.8}>
                                Send Link
                        </TouchButton>

                        <TouchableOpacity 
                            onPress = {() => navigate('Login')}
                            title = "Cancel"><Text style={STYLES.linkText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </Image>
        );
    }
}

module.exports = ForgotPassword;
