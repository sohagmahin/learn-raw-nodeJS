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

// App scaffolding
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

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('data', () => {
        realData += decoder.end();
        console.log(realData);
        res.end('hello world');
    });
    // response handle
};

module.exports = handler;
