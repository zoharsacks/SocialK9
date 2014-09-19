var https = require('https'); //Https module of Node.js
var fs = require('fs'); //FileSystem module of Node.js
var FormData = require('form-data'); //Pretty multipart form maker.
var Quotes = require('../facebook/quotes').getQuotes();
var ACCESS_TOKEN = "CAACEdEose0cBAAyVsF9qrWZB5ge7mPvG5fF4aOPIOdflsCsKiVyQDc8iEcRRnhRCZAaAsxHlhsHZAW8BDVMbI3OwUZAWNQq1T1ov6ARmgZAyUd3eSdr2M9ldQXT8Ltq4NGdcV0tbwDiorv240qIohhVAsGlgiCyjIHsPdDvkiIOctpWgS7KLGgdv0tYKnLSwNnlRU9iSA5OqaomFSzDZBC1OXNueCBwZAMZD";


exports.postImage = function(path){
    var form = new FormData(); //Create multipart form
    var message = Quotes.quotes[Math.floor(Math.random() * Quotes.quotes.length)];
    form.append('file', fs.createReadStream(path)); //Put file
    form.append('message', message); //Put message

//POST request options, notice 'path' has access_token parameter
    var options = {
        method: 'post',
        host: 'graph.facebook.com',
        path: '/me/photos?access_token='+ACCESS_TOKEN,
        headers: form.getHeaders()
    }

//Do POST request, callback for response
    var request = https.request(options, function (res){
        console.log("facebook post success, res: " + res);
    });

//Binds form to request
    form.pipe(request);

//If anything goes wrong (request-wise not FB)
    request.on('error', function (error) {
        console.log(error);
    });
}

