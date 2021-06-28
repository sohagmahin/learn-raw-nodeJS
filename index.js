/*
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: Sohag (www.github.com/sohagmahin)
 * Date: 21/06/2021
 *
 */

// dependecies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');
const data = require('./lib/data');

// app object - module scaffolding
const app = {};

// testing file system
// @TODO: will be erase

// Write data to file storage
// data.create('test', 'newFile', { name: 'Bangladesh', language: 'Bangla' }, (err) => {
//     console.log(err);
// });

// read data from file
// data.read('test', 'newFile', (err, data) => {
//     console.log(err, data);
// });

// update the file
// data.update('test', 'newFile', { name: 'Germany', language: 'German' }, (err) => {
//     console.log(err);
// });

// delete file
data.delete('test', 'newFile', (err) => {
    console.log(err);
});

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        // console.log(`your environment is ${process.env.NODE_ENV}`);
        console.log(`listening to port ${environment.port}`);
    });
};

// handle reqest and response
app.handleReqRes = handleReqRes;

// start the server
app.createServer();
