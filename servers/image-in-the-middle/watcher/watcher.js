/**
 * Created by scancel on 18/09/14.
 */
// Watch for changes on the images folder
var watch = require('watch'),
    face_detect = require('../face-detect/face-detect'),
    facebook = require('../facebook/facebook');

function newFileHandler (f, stat) {
	// Handle new files
	console.log("new files added");
    // Try to detect a face
    face_detect.detect(f, function(faceDetected){
        if(faceDetected){
            console.log("face detected successfully");
            facebook.postImage(f);
        }
        else{
            console.log("face detection failed");
        }
    });
}
function changedFileHandler (f, curr, prev) {
	// Handle file changes
	console.log("changed files");
}
function removedFileHandler (f, stat) {
	// Handle removed files
	console.log("removed files");
}

exports.create = function(path){
	if(!path){
		path = "/images";
	}
	watch.createMonitor(path, function (monitor) {
		monitor.files[path + '/.jpg']; // Stat object for my zshrc.
		monitor.on("created", newFileHandler);
		monitor.on("changed", changedFileHandler);
		monitor.on("removed", removedFileHandler);
		//monitor.stop(); // Stop watching
	});
}

