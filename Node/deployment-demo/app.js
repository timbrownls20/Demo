const express = require('express');
const cors = require('cors');
const config = require('./config');

const server = express();
server.use(cors());

server.get('/', (req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/json')
    res.end(config.message);
});

server.listen(config.port, config.hostname, () => {
    console.log(`server running at ${config.hostname}:${config.port}`);
});