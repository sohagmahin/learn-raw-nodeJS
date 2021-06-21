/*
 * Title: Sample handler
 * Description: Handle sample handler route
 * Author: Sohag (www.github.com/sohagmahin)
 * Date: 21/06/2021
 *
 */
// dependencies

const { notFoundHandler } = require('./handlers/routeHandlers/notFoundHandler');
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');

// routes scaffolding
const routes = {
    sample: sampleHandler,
    notfound: notFoundHandler,
};
module.exports = routes;
