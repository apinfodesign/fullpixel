var router          = require('express').Router(),
    busboy          = require('connect-busboy'),
    fs              = require('fs'),
    gm              = require('gm'),
    imageMagick     = gm.subClass({ imageMagick: true }),  //for the heroku dependencies
    AWS				= require('aws-sdk');

// AWS.config.loadFromPath('../../config.json');
// // example from AWS
// var s3 = new AWS.S3(); 

//  s3.createBucket({Bucket: 'fullpixel'}, function() {

//   var params = {Bucket: 'myBucket', Key: 'myKey', Body: 'Hello!'};

//   s3.putObject(params, function(err, data) {

//       if (err)       

//           console.log(err)     

//       else       console.log("Successfully uploaded data to myBucket/myKey");   

//    });

// });



router.post('/api/user/upload', function(req, res, next){
	var fstream;
	var cameraModel;
    req.pipe(req.busboy);
	req.busboy.on('file', function(fieldname, file, filename){
		console.log('uploading........ (image.js)' +filename);
		fstream = fs.createWriteStream('./public/uploads/' + filename);
		file.pipe(fstream);
		
		fstream.on('close', function(){
 			var	uploadPath = './public/uploads/' + filename;
			console.log(uploadPath + " is uploadPath");
 
 			imageMagick(uploadPath)
 				.identify(function (error, data) {
			  	if (!error) {
			  		console.log(data);
	  		  		}
	  		  	else { console.log("gm error: " + error); }
 		  		res.json(data);
 			});
		});
	});
});

module.exports = router;