import settings from '../config/settings';

// Methods
var Service = {
    getToken: getToken,
    forgotPassword: forgotPassword
}

function getHost() {
    return settings.authHost;
}

function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

/**
 * Requests an oauth token using email/password
 * 
 * @param {String} email 
 * @param {String} password 
 */
function getToken(email, password) {
    return fetch(getHost() + 'oauth/token', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            email: email,
            password: password,
            grant_type: 'password',
        })
    })
    .then((response) => {
        return response.json();
    })
    .catch((error) => {
        console.error(error);
        throw error;
    })
}

/**
 * Sends a forgot password request to authorization host
 * 
 * @param {String} email
 */
function forgotPassword(email) {
    // Too easy to get Tokens for any known emails and reset password...
    console.log('Probably don`t add this...');
    // return fetch(getHost() + 'password/forgot', {
    //     method: 'POST',
    //     headers: getHeaders(),
    //     body: JSON.stringify({
    //         email: email
    //     })
    // })
    // .then((response) => {
    //     return response.json();
    // })
    // .catch((error) => {
    //     throw error;
    // })
}

export default Service;
