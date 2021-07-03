/*
 * Title: User handler
 * Description: this handler handle user request
 * Author: Sohag (www.github.com/sohagmahin)
 * Date: 28/06/2021
 *
 */

// dependencies
const data = require('../../lib/data');
const { hash } = require('../../helpers/utilities');

// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._user[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
    // calling requestProperties
    console.log(requestProperties);
};

handler._user = {};

handler._user.post = (requestProperties, callback) => {
    const firstName =        typeof requestProperties.body.firstName === 'string' &&
        requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;

    const lastName =        typeof requestProperties.body.lastName === 'string' &&
        requestProperties.body.lastName.trim().length > 0
            ? requestProperties.body.lastName
            : false;

    const phone =        typeof requestProperties.body.phone === 'string' &&
        requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;

    const password =        typeof requestProperties.body.password === 'string' &&
        requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;

    const tosAgreement =        typeof requestProperties.body.tosAgreement === 'boolean'
            ? requestProperties.body.tosAgreement
            : false;

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

handler._user.get = (requestProperties, callback) => {
    callback(200);
};
handler._user.put = (requestProperties, callback) => {};
handler._user.delete = (requestProperties, callback) => {};
module.exports = handler;
