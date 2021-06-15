const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello programmers');
        res.write('How are you doing?');
        res.end();
    } else if (req.url === '/about-us') {
        res.write('This is about-us');
        res.end();
    } else {
        res.write('page not found!');
        res.end();
    }
});

server.listen('3000');

console.log('listening on port 3000');
