/*
 * Title: not found handler
 * Description: 404 not found handler
 * Author: Sohag (www.github.com/sohagmahin)
 * Date: 21/06/2021
 *
 */

// module scaffolding
const handler = {};

handler.notFoundHandler = (requestRequirements, callback) => {
    // calling request requirements
    console.log(requestRequirements);
    callback(404, {
        message: 'Your requested url was not found!',
    });
};
module.exports = handler;
