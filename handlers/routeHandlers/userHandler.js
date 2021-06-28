/*
 * Title: User handler
 * Description: this handler handle user request
 * Author: Sohag (www.github.com/sohagmahin)
 * Date: 28/06/2021
 *
 */

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

    callback(200, {
        message: 'This is user url!',
    });
};

handler._user = {};

handler._user.post = (requestProperties, callback) => {};

handler._user.get = (requestProperties, callback) => {
    callback(200);
};
handler._user.put = (requestProperties, callback) => {};
handler._user.delete = (requestProperties, callback) => {};
module.exports = handler;
