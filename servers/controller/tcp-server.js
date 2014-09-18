var net = require('net');
var fs = require('fs');
var buffer = require('buffer');
var util = require('util');

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

var PORT = '8080'
var FILEPATH = '/tmp/geekcon/';

var stream = undefined;

server.listen(PORT, function() {
    //listening
    console.log('server bound to ' + PORT + '\n');
    console.log('server stats ' + util.inspect(server.address()));

    server.on('connection', function(){
        console.log('connection made...\n')
        stream = fs.createWriteStream(FILEPATH + Date.now() + ".jpg");
    })
});