/*
 * Title: Utilities
 * Description: Utilities function
 * Author: Sohag (www.github.com/sohagmahin)
 * Date: 03/07/2021
 *
 */

// dependencies
const crypto = require('crypto');
const environments = require('./environments');

// module scaffolding
const utilities = {};

utilities.parseJSON = (stringData) => {
    let output;
    try {
        output = JSON.parse(stringData);
    } catch {
        output = {};
    }
    return output;
};

// hash string
utilities.hash = (str) => {
    if (typeof str === 'string' && str.length > 0) {
        const secret = environments.secretKey;
        const hash = crypto.createHmac('sha256', secret).update(str).digest('hex');
        return hash;
    }
    return false;
};

module.exports = utilities;
