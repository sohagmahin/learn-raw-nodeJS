/*
 * Title: Handle request & response
 * Description: Handle user request and response
 * Author: Sohag (www.github.com/sohagmahin)
 * Date: 21/06/2021
 *
 */

// dependencies
const { StringDecoder } = require('string_decoder');
const url = require('url');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');

// handles scaffolding
const handler = {};

// handle request response
handler.handleReqRes = (req, res) => {
    // request handling
    // get the url & parse it
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject,
    };

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();

        const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;
        chosenHandler(requestProperties, (statusCode, payload) => {
            statusCode = typeof statusCode === 'number' ? statusCode : 500;
            payload = typeof payload === 'object' ? payload : {};
            const payloadString = JSON.stringify(payload);
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });
    // response handle
};

module.exports = handler;
