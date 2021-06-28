/*
 * Title: Sample handler
 * Description: Handle sample handler route
 * Author: Sohag (www.github.com/sohagmahin)
 * Date: 21/06/2021
 *
 */

// dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');
const { userHandler } = require('./handlers/routeHandlers/userHandler');
// routes scaffolding
const routes = {
    sample: sampleHandler,
    user: userHandler,
};
module.exports = routes;
