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

handler._token.post = (requestProperties, callback) => {};

handler._token.get = (requestProperties, callback) => {};

handler._token.put = (requestProperties, callback) => {};
handler._token.delete = (requestProperties, callback) => {};
module.exports = handler;
