var http = require('http');
var app = require('./app');

const port = 8080;

var server = http.createServer(app);
server.listen(port);

console.log(`Listening on port ${port}\n`);
