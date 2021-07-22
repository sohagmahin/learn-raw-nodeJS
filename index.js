/*
 * Title: Project initial file
 * Description: Initial file to start the node server and workers
 * Author: Sohag (www.github.com/sohagmahin)
 * Date: 22/07/2021
 *
 */

// dependecies
const server = require('./lib/server');
const worker = require('./lib/worker');

// app object - module scaffolding
const app = {};

app.init = () => {
    // start server
    server.init();

    // start workers
    worker.init();
};

// init the app
app.init();

// export
module.exports = app;
