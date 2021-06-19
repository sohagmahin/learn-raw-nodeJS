const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('<html><head><title>Form</title></head>');
        res.write(
            '<body><form method="post" action="/process"><input name="message"/></form></body>'
        );
        res.end();
    } else if (req.url === '/process' && req.method === 'POST') {
        // const body = [];
        // req.on('data', (chunk) => {
        //     body.push(chunk);
        //     console.log(chunk);
        // });
        // req.on('end', () => {
        //     console.log('Stream finished');
        //     const parsedData = Buffer.concat(body).toString();
        //     console.log(parsedData);
        // });
        // res.write('This is process page');
        // res.end();
        const readStream = fs.createReadStream(`${__dirname}/bigData.txt`, 'utf8');
        readStream.pipe(res);
    } else {
        res.write('Not found!!');
        res.end();
    }
});

server.listen('3000');
console.log('Server started on 3000 port!');