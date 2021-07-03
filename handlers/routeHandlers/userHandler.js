/* eslint-disable no-underscore-dangle */
/*
 * Title: User handler
 * Description: this handler handle user request
 * Author: Sohag (www.github.com/sohagmahin)
 * Date: 28/06/2021
 *
 */

// dependencies
const data = require('../../lib/data');
const { hash, parseJSON } = require('../../helpers/utilities');

// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._users[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
    // calling requestProperties
    console.log(requestProperties);
};

handler._users = {};

handler._users.post = (requestProperties, callback) => {
    let firstName;
    let lastName;
    let phone;
    let password;
    let tosAgreement;

    // firstName validation check
    if (
        typeof requestProperties.body.firstName === 'string'
        && requestProperties.body.firstName.trim().length > 0
    ) {
        firstName = requestProperties.body.firstName;
    } else {
        firstName = false;
    }
    // lastName validation check
    if (
        typeof requestProperties.body.lastName === 'string'
        && requestProperties.body.lastName.trim().length > 0
    ) {
        lastName = requestProperties.body.lastName;
    } else {
        lastName = false;
    }

    // phone number validation check
    if (
        typeof requestProperties.body.phone === 'string'
        && requestProperties.body.phone.trim().length === 11
    ) {
        phone = requestProperties.body.phone;
    } else {
        phone = false;
    }

    // password validation check
    if (
        typeof requestProperties.body.password === 'string'
        && requestProperties.body.password.trim().length > 0
    ) {
        password = requestProperties.body.password;
    } else {
        password = false;
    }
    // tosAgreement validation check
    if (typeof requestProperties.body.tosAgreement === 'boolean') {
        tosAgreement = requestProperties.body.tosAgreement;
    } else {
        tosAgreement = false;
    }

    if (firstName && lastName && phone && password && tosAgreement) {
        data.read('users', phone, (err1) => {
            // make sure that the user doesn't already exists
            if (err1) {
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement,
                };

                // store the user to db
                data.create('users', phone, userObject, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'User was created successfully!',
                        });
                    } else {
                        callback(500, {
                            error: 'There was a problem in server side',
                        });
                    }
                });
            } else {
                callback(500, {
                    error: 'There was a problem in server side!',
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem in your request',
        });
    }
};

handler._users.get = (requestProperties, callback) => {
    let phone;

    // user phone number validation check
    if (
        typeof requestProperties.queryStringObject.phone === 'string'
        && requestProperties.queryStringObject.phone.trim().length > 0
    ) {
        phone = requestProperties.queryStringObject.phone;
    } else {
        phone = false;
    }

    if (phone) {
        // lookup the user
        data.read('users', phone, (err, u) => {
            const user = { ...parseJSON(u) };
            if (!err && user) {
                delete user.password;
                callback(200, user);
            } else {
                callback(404, {
                    error: 'Requested user was not found!',
                });
            }
        });
    }
};

handler._users.put = (requestProperties, callback) => {};
handler._users.delete = (requestProperties, callback) => {};
module.exports = handler;
