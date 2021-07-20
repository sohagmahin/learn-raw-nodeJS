/* eslint-disable no-underscore-dangle */
/*
 * Title: check handler
 * Description:  handle user defined check
 * Author: Sohag (www.github.com/sohagmahin)
 * Date: 20/07/2021
 *
 */

// dependencies
const data = require('../../lib/data');
const { hash, parseJSON } = require('../../helpers/utilities');
const tokenHandler = require('./tokenHandler');

// module scaffolding
const handler = {};

handler.checkHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._check[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._check = {};

handler._check.post = (requestProperties, callback) => {};

handler._check.get = (requestProperties, callback) => {};

handler._check.put = (requestProperties, callback) => {};
handler._check.delete = (requestProperties, callback) => {};
module.exports = handler;
