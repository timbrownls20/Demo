const express = require('express');
const cors = require('cors');
const {hostname, port, message} = require('./config');

const server = express();
server.use(cors());

server.get('/', (req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/json')
    res.end(message);
});

server.listen(port, hostname, () => {
    console.log(`server running at ${hostname}:${port}`);
});