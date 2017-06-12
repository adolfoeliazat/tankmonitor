import React, { 
    Component
} from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {
    StackNavigator
} from 'react-navigation';
import {
    TouchButton,
    TextBox,
    CommonStyles
} from './../components/index';
import {
    ThingsSerivce
} from './../lib/index';
import Hr from 'react-native-hr';
import _ from 'lodash';

class GatewaySetup extends Component {
    static navigationOptions = {header: null};

    constructor() {
        super();
        this.state = {
            gatewayName: '',
            gatewayId: '',
            location: '',
            showInitHeader: true,
            showErrorHeader: false
        };
        this.addGateway = _.debounce(this.addGateway.bind(this), 1000, {leading: true});
    }

    addGateway = () => {
        var vm = this;
        const { navigate } = this.props.navigation;
        let { showInitHeader, showErrorHeader, gatewayName, gatewayId, location} = this.state;

        gatewayId = '4883C7DF3001191D';

        vm.setState({showInitHeader: false});
        ThingsSerivce.pairGateway(gatewayName, gatewayId).then(function(response) {
            if (response.statusCode >= 400) {
                vm.setState({showErrorHeader: true, showInitHeader: false});
                setTimeout(() => {
                    vm.setState({showErrorHeader: false, showInitHeader: true});
                }, 2000);
                return;
            }
            return navigate('SensorSetup', screenProps = {gateway: response});
        })
    }

    getHeader = () => {
        const { showInitHeader, showErrorHeader} = this.state;
        if (showInitHeader)
            return (
                <View style={{
                    flex: .05,
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: 5
                }}>
                    <Text style={[CommonStyles.white, CommonStyles.textHeader ]}>SET UP GATEWAY</Text>
                </View>
            );
        if (!showInitHeader && !showErrorHeader)
            return (
                <View style={{
                    flex: .05,
                    marginBottom: 15
                }}>
                    <TouchableOpacity style={{
                        backgroundColor: '#5CB85C'
                    }}>
                        <Text style={{
                            color: 'white',
                            margin: 10
                        }}>Adding gateway...
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        if (showErrorHeader)
            return (
                <View style={{
                    flex: .05,
                    marginBottom: 30
                }}>
                    <TouchableOpacity style={{
                        backgroundColor: '#d9534f'
                    }}>
                        <Text style={{
                            color: 'white',
                            margin: 10
                        }}>Gateway not added. Please check Gateway ID and try again
                        </Text>
                    </TouchableOpacity>
                </View>
            );
    }

    render() {
        return (
            <View style={CommonStyles.background}>
                {this.getHeader()}

                <View style={{
                    flex: 0.05
                }}>
                    <Text style={{
                        color: 'white',
                        position: 'absolute',
                        left: 0
                    }}>Gateway Setup</Text>
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
                        onChangeText = {(text) => this.setState({gatewayName: text})}
                        placeholder = 'Gateway Name'/>
                    <TextBox 
                        onChangeText = {(text) => this.setState({gatewayId: text})} 
                        placeholder='Gateway ID' />
                    <TextBox 
                        onChangeText = {(text) => this.setState({location: text})} 
                        placeholder='Location' />
                </View>

                <View style={{flex:0.15}}>
                    <TouchButton
                        title = 'Add Gateway'
                        onPress = {() => {this.addGateway()}}
                        activeOpacity={0.8}
                        style={{backgroundColor: '#5CB85C'}}>
                            ADD GATEWAY
                    </TouchButton>
                </View>
            </View>
        );
    }
}

module.exports = GatewaySetup;
