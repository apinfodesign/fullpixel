var router = require('express').Router();
var busboy = require('connect-busboy');
var fs = require('fs');
var gm = require('gm');
var bufferjs = require('bufferjs');


router.post('/api/user/upload', function(req, res, next){
	var fstream;
	var cameraModel;
	req.pipe(req.busboy);
	req.busboy.on('file', function(fieldname, file, filename){
		console.log('uploading........ (image.js)' +filename);
		fstream = fs.createWriteStream('./public/uploads/' + filename);
		file.pipe(fstream);
		
		fstream.on('close', function(){
			console.log('upload stream closed(from image.js)');
			console.log(filename + " is filename.");
			console.log(fstream.path + " is filepath.");

 			var	uploadPath = './public/uploads/' + filename;

			console.log(uploadPath + " is uploadPath");

			//  gm(uploadPath)
			// 	.options({imageMagick: true})
			// 	.identify(function(err, value){
			// 	console.log (err + " is err");
			// 	console.log (value + " is value");
			// 	res.json(value);
			// 	});
 
 			gm(uploadPath)
 				.identify(function (error, data) {
			  	if (!error) {
			   		cameraModel = data["Profile-EXIF"].Model;
	  		  		}
	  		  	else{
	  		  		console.log("gm error: " + error);
 				 	}

	  			console.log('1 '+ data.Compression);//jpeg
	  			console.log('2 '+ data.Signature);  // blob
  	  			console.log('3 '+ cameraModel);  	//nexus
 		  		
 		  		res.json(data);
 			});
		});
	});
});
module.exports = router;