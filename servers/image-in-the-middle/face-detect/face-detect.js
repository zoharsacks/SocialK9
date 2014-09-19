/**
 * Created by scancel on 18/09/14.
 */
// Watch for changes on the images folder

var cv = require('opencv')

exports.detect = function(path, callback){
    cv.readImage(path, function(err, im){
        im.detectObject("haarcascade_eye.xml", {}, function(err, faces){
            callback(faces.length > 0);
        });
    });
}

