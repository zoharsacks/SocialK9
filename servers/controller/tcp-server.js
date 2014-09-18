var net = require('net');
var fs = require('fs');
var buffer = require('buffer');

var server = net.createServer(function(conn) {
    console.log('server connected');

    conn.on('data', function(data) {
        console.log('data received');
        stream.write(data);
    });

    conn.on('end', function(){
        stream.end();
        stream = undefined; // better safe then sorry
    })
});

var HOST = '127.0.0.1';
var PORT = '7192'
var FILEPATH = '/tmp/geekcon/';

var stream = undefined;

server.listen(PORT, HOST, function() {
    //listening
    console.log('server bound to ' + PORT + '\n');

    server.on('connection', function(){
        console.log('connection made...\n')
        stream = fs.createWriteStream(FILEPATH + Date.now() + ".jpg");
    })
});