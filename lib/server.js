/*
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: Sohag (www.github.com/sohagmahin)
 * Date: 21/06/2021
 *
 */

// dependecies
const http = require('http');
const { handleReqRes } = require('../helpers/handleReqRes');
const environment = require('../helpers/environments');

// server object - module scaffolding
const server = {};

// create server
server.createServer = () => {
    const createServerVariable = http.createServer(server.handleReqRes);
    createServerVariable.listen(environment.port, () => {
        // console.log(`your environment is ${process.env.NODE_ENV}`);
        console.log(`listening to port ${environment.port}`);
    });
};

// handle request and response
server.handleReqRes = handleReqRes;

// init the server
server.init = () => {
    server.createServer();
};

// export module
module.exports = server;
