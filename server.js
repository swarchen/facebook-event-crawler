'use strict';

var http = require('http'),
    crawler = require('./crawler.js');

http.createServer(function (request, response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.end('Not Found\n');
}).listen(8081);

crawler.crawl();


setInterval(function(){
	crawler.crawlFirst();
},10000);