import settings from '../config/settings';

// Methods
var Service = {
    getToken: getToken,
    forgotPassword: forgotPassword
}

/**
 * Get the authorization host
 * 
 * @returns {String}
 */
function getHost() {
    return settings.authHost;
}

/**
 * Get the headers used for API calls
 * 
 * @returns {*}
 */
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
        throw error;
    })
}

/**
 * Sends a forgot password request to authorization host
 * 
 * @param {String} email
 */
function forgotPassword(email) {
    return fetch(getHost() + 'password/forgot', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            email: email
        })
    })
    .then((response) => {
        return response.json();
    })
    .catch((error) => {
        throw error;
    })
}

export default Service;
