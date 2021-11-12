const http = require('http');
const config = require('./config');

const hostname = config.hostname;
const port = config.port;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/json')
    res.end(config.message);
});

server.listen(port, hostname, () => {
    console.log(`server running at ${hostname}:${port}`);
});