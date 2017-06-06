import React, { 
    Component 
} from 'react';
import {  
  WebView
} from 'react-native';

import CONFIG from '../config/index';

class ForgotPassword extends Component {
    static navigationOptions = {header: null};

    constructor() {
        super();
        this.getToken = this.getToken.bind(this);
        this.test = this.test.bind(this);
    }

    test = () => {
        event.persist();
        var {onError, onLoadEnd} = this.props;
        console.log('test...');
        console.log(onError);
        console.log(onLoadEnd);
    }

    getToken = (event) => {
        //event.persist();
        //var {onError} = this.props;
        //console.log(onError);
        // var url = "http://www.abx.com?" + $.param({foo: "bar", baz: "kuuq"})

        console.log(event);
        console.log('Something went wrong?');
    }

    render() {
        return (
            <WebView
                source={{uri: CONFIG.settings.authHost + 'oauth/authorization?redirect_uri=' + CONFIG.settings.redirect_uri + '&client_id=' + CONFIG.settings.appKey + '&state=12345&response_type=token'}}
                style={{marginTop: 20}}
                onLoadingError={()=>{this.test()}}
                renderError={() => {this.getToken(errorDomain)}}
            />
        );
    }
}

module.exports = ForgotPassword;