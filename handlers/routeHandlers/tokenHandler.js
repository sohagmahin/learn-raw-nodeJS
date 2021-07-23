/* eslint-disable no-underscore-dangle */
/*
 * Title: Token handler
 * Description: Token handler handle token request
 * Author: Sohag (www.github.com/sohagmahin)
 * Date: 04/07/2021
 *
 */

// dependencies
const data = require('../../lib/data');
const { hash, createRandomString, parseJSON } = require('../../helpers/utilities');
// module scaffolding
const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._token[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
    // calling requestProperties
    console.log(requestProperties);
};

handler._token = {};

handler._token.post = (requestProperties, callback) => {
    let phone;
    let password;
    // phone number validation check
    if (
        typeof requestProperties.body.phone === 'string' &&
        requestProperties.body.phone.trim().length === 11
    ) {
        phone = requestProperties.body.phone;
    } else {
        phone = false;
    }

    // password validation check
    if (
        typeof requestProperties.body.password === 'string' &&
        requestProperties.body.password.trim().length > 0
    ) {
        password = requestProperties.body.password;
    } else {
        password = false;
    }

    if (phone && password) {
        data.read('users', phone, (err1, userData) => {
            const hashedpassword = hash(password);
            if (hashedpassword === parseJSON(userData).password) {
                const tokenId = createRandomString(20);
                // 1 hour expire date
                const expires = Date.now() + 60 * 60 * 1000;
                const tokenObject = {
                    phone,
                    id: tokenId,
                    expires,
                };

                // store tokens to db
                data.create('tokens', tokenId, tokenObject, (err2) => {
                    if (!err2) {
                        callback(200, tokenObject);
                    } else {
                        callback(500, {
                            error: 'There was a problem in server side!',
                        });
                    }
                });
            } else {
                callback(400, {
                    error: 'Password is not valid!',
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem in your request!',
        });
    }
};

handler._token.get = (requestProperties, callback) => {
    let id;

    // user phone number validation check
    if (
        typeof requestProperties.queryStringObject.id === 'string'
        && requestProperties.queryStringObject.id.trim().length === 20
    ) {
        id = requestProperties.queryStringObject.id;
    } else {
        id = false;
    }
    if (id) {
        // lookup the token
        data.read('tokens', id, (err, tokenData) => {
            const token = { ...parseJSON(tokenData) };
            if (!err && token) {
                callback(200, token);
            } else {
                callback(404, {
                    error: 'Requested token was not found!',
                });
            }
        });
    } else {
        callback(404, {
            error: 'Requested token was not found!',
        });
    }
};

handler._token.put = (requestProperties, callback) => {
    let id;
    let extend;

    // user phone number validation check
    if (
        typeof requestProperties.body.id === 'string'
        && requestProperties.body.id.trim().length === 20
    ) {
        id = requestProperties.body.id;
    } else {
        id = false;
    }

    // extend token date
    if (
        typeof requestProperties.body.extend === 'boolean'
        && requestProperties.body.extend === true
    ) {
        extend = requestProperties.body.extend;
    } else {
        extend = false;
    }

    if (id && extend) {
        // lookup the token
        data.read('tokens', id, (err, tokenData) => {
            const tokenObject = { ...parseJSON(tokenData) };
            if (tokenObject.expires > Date.now()) {
                tokenObject.expires = Date.now() + 60 * 60 * 1000;
                data.update('tokens', id, tokenObject, (err2) => {
                    if (!err2) {
                        callback(200);
                    } else {
                        callback(500, {
                            error: 'There was a server side error!',
                        });
                    }
                });
            } else {
                callback(400, {
                    error: 'Token already expired!',
                });
            }
        });
    } else {
        callback(400, {
            error: 'There was a problem in your request!',
        });
    }
};
handler._token.delete = (requestProperties, callback) => {
    let id;
    // phone number validation check
    if (
        typeof requestProperties.queryStringObject.id === 'string' &&
        requestProperties.queryStringObject.id.trim().length === 20
    ) {
        id = requestProperties.queryStringObject.id;
    } else {
        id = false;
    }

    if (id) {
        // lookup token
        data.read('tokens', id, (err1, tokenData) => {
            if (!err1 && tokenData) {
                data.delete('tokens', id, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'Token was successfully deleted!',
                        });
                    } else {
                        callback(500, {
                            message: 'There was a server side error !',
                        });
                    }
                });
            } else {
                callback(500, {
                    message: 'There was a server side error !',
                });
            }
        });
    } else {
        callback(400, {
            message: 'There was a problem in your request!',
        });
    }
};

handler._token.verify = (id, phone, callback) => {
    data.read('tokens', id, (err, tokenData) => {
        if (!err && tokenData) {
            if (parseJSON(tokenData).phone === phone && parseJSON(tokenData).expires > Date.now()) {
                callback(true);
            } else {
                callback(false);
            }
        } else {
            callback(false);
        }
    });
};
module.exports = handler;
