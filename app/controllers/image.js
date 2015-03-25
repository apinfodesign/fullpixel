var router = require('express').Router();
var busboy = require('connect-busboy');
var fs = require('fs');
var gm = require('gm');
var degreeToDecimal = require('./degreeToDecimal'); //mh gps conversion function
 
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
 
 			gm(uploadPath)
 				.identify(function (error, data) {
			  	if (!error) {
			   		var cameraModel = data["Profile-EXIF"].Model;

 			   		var lat = data["Profile-EXIF"]['GPS Latitude'];
			        var latDirection = data["Profile-EXIF"]['GPS Latitude Ref'];				
					var lon = data["Profile-EXIF"]['GPS Longitude'];
			        var lonDirection = data["Profile-EXIF"]['GPS Longitude Ref'];
			        
					var latOut = degreeToDecimal(lat, latDirection);
			        var lonOut = degreeToDecimal(lon, lonDirection);
	  		  		}
	  		  	else{console.log("gm error: " + error);}

	  		  	console.log(data);
				console.log(latOut + " is latOut");
				console.log(lonOut + " is lonOut");
	  			console.log('1 '+ data.Compression);//jpeg
  	  			console.log('2 '+ cameraModel);  	//nexus
 		  		
 		  		res.json(data );
 				});
		});
	});
});

module.exports = router;