/*
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: Sohag (www.github.com/sohagmahin)
 * Date: 21/06/2021
 *
 */

// dependecies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

// app object - module scaffolding
const app = {};

// configaration
app.config = {
    port: 3000,
};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`listening to port ${app.config.port}`);
    });
};

// handle request response
app.handleReqRes = (req, res) => {
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

// start the server
app.createServer();
