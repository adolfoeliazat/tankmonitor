import {
    APP_KEY,
    APP_SECRET,
    AUTH_HOST,
    REDIRECT_URI
} from 'react-native-dotenv';

const settings = {
    appKey: APP_KEY,
    appSecret: APP_SECRET,
    authHost: AUTH_HOST,
    redirect_uri: REDIRECT_URI,
    accessToken: '',
    getLoginUri: getLoginUri,
    state: '',
    guid: guid
}

/**
 * Construct Cayenne API URI
 * 
 * @param {String} state 
 * @returns {String}
 */
function getLoginUri() {
    return settings.authHost + 'oauth/authorization?redirect_uri=' + settings.redirect_uri + '&client_id=' + settings.appKey + '&state=' + settings.state + '&response_type=token';
}

/**
 * Create a random GUID
 */
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export default settings;
