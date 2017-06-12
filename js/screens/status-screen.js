import React, { 
    Component
} from 'react';
import {
  View,
  Text
} from 'react-native';
import {
  StackNavigator
} from 'react-navigation';
import {
    TextBox,
    CommonStyles
} from './../components/index';
import Hr from 'react-native-hr';

class Status extends Component {
    static navigationOptions = {header: null};
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return (
            <View style={CommonStyles.background}>
                <View style={{
                    flex: .05,
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: 10 }}>
                        <Text style={[CommonStyles.white, CommonStyles.textHeader ]}>STATUS</Text>
                        <Text style={[CommonStyles.white, {position: 'absolute', right: 0, fontSize: 30, fontWeight: 'bold'}]}>+</Text>
                </View>

                <Hr lineColor='#b3b3b3' textColor='steelblue' />

                <View style={{ flex: 0.95}}>










                </View>
            </View>
        )
    }
}

module.exports = Status;
