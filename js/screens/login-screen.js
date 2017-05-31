import React from 'react';
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

const styles = StyleSheet.create({
        inputField:{
            marginLeft:10,
            marginRight:10,
            marginTop:5,
            marginBottom:5,
            padding:15,
            borderRadius: 5,
            backgroundColor:'white'
        },
        buttonText:{
            marginLeft:10,
            marginRight:10,
            marginTop:5,
            marginBottom:2,
            padding:15,
            borderRadius: 5,
            textAlign:'center',
            backgroundColor: '#2C95EC',
            fontSize:24,
            color:'white'
        },
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

class LoginScreen extends React.Component{
    static navigationOptions = {header: null};

    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            modalVisible: false
        };
        this.setModalVisible = this.setModalVisible.bind(this);
        this.signInTest = this.signInTest.bind(this);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    signInTest(){
    }

    render(){
        const {navigate} = this.props.navigation;
        return(
                <Image style={styles.backgroundImageContainer} source={require('../images/tankBg.jpg')}>
                    <Modal
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
                        <Image style={{margin:50, backgroundColor:'transparent'}} source={require('../images/myDevicesWhite.png')}/>
                        <TextInput style={styles.inputField} onChangeText={(text) => this.setState({username: text})} placeholder='Username' />
                        <TextInput secureTextEntry={true} style={styles.inputField} onChangeText={(text) => this.setState({password: text})} placeholder='Password' />
                        <TouchableOpacity onPress={() => {this.signInTest()}} activeOpacity={0.8}><Text style={styles.buttonText}>Sign In</Text></TouchableOpacity>
                        <Text style={styles.linkText}>Forgot Password?</Text>
                    </View>
                    <View style={{flex:0.5}}/>
                </Image>
        );
    }
}

module.exports = LoginScreen;