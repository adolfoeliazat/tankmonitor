import React, { 
    Component
} from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import {
  StackNavigator
} from 'react-navigation';
import {
    TextBox,
    CommonStyles,
    Footer,
    Header
} from './../components/index';
import Hr from 'react-native-hr';
import Icon from 'react-native-vector-icons/FontAwesome';

class Status extends Component {
    static navigationOptions = {header: null};
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={[CommonStyles.background, {flex: 1}]}>
                {/*Will need to save gateway info*/}
                <Header title='STATUS' navigation={this.props.navigation} visible={true} onPress = {() => navigate('SensorSetup', screenProps = {gateway: 'ping'})}/>
                <ScrollView style={{flex: 0.85}}>

                    <View style={{ flex: 1}}>




                    </View>
                </ScrollView>
                <Footer navigation={this.props.navigation}/>
            </View>
        )
    }
}

module.exports = Status;
