/*
 * Title: Sample handler
 * Description: Sample handler
 * Author: Sohag (www.github.com/sohagmahin)
 * Date: 21/06/2021
 *
 */

// app scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
    // calling requestProperties
    console.log(requestProperties);
    callback(200, {
        message: 'This is sample url!',
    });
};
module.exports = handler;
