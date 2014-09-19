var https = require('https'); //Https module of Node.js
var fs = require('fs'); //FileSystem module of Node.js
var FormData = require('form-data'); //Pretty multipart form maker.

var ACCESS_TOKEN = "CAACEdEose0cBAFvFV9T1LobY88M57iXYUWBwQt5IImH7vvs4PxqXf1quHgdGUwsNiKml5Ob8ZAYk6xjCWM0M6jGuN3bR0LkkWWnsZClDju3MkJfOw38cTj49jv8I4F3q053VRB9zLPmi11e0aSTzhUehntaI1ncDI5X4g3FWKL98vWQtAsB6Tz6g6ZAgG4lQPOUZAZCcQ7JkOckbz4jpz";


exports.postImage = function(path){
    var form = new FormData(); //Create multipart form
    form.append('file', fs.createReadStream(path)); //Put file
    form.append('message', "SocialK9 many win"); //Put message

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

