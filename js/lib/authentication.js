import settings from '../config/settings';

// Methods
var Service = {
    getToken: getToken
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
            //grant_type: 'authorization_code',
            client_id: 'bb359186-f21e-4937-a241-e4af652a6907',
            //code: 'c7a150a5-899c-4c8c-9bd8-ed50b363d0e4'
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

export default Service;
