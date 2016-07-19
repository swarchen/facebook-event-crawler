'use strict';

var http = require('http'),
    poster = require('./poster.js');

http.createServer(function (request, response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.end('Not Found\n');
}).listen(8080);

poster.comment();