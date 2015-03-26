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
			//console.log('upload stream closed(from image.js)');
			//console.log(filename + " is filename.");
			//console.log(fstream.path + " is filepath.");
 			var	uploadPath = './public/uploads/' + filename;
			console.log(uploadPath + " is uploadPath");
 
 	
 			gm(uploadPath)
 				.identify(function (error, data) {
 				// console.log(Date.now()+ " is 1");
			  	if (!error) {
			   		var cameraModel = data["Profile-EXIF"].Model;

 			   		var lat = data["Profile-EXIF"]['GPS Latitude'];
			        var latDirection = data["Profile-EXIF"]['GPS Latitude Ref'];				
					var lon = data["Profile-EXIF"]['GPS Longitude'];
			        var lonDirection = data["Profile-EXIF"]['GPS Longitude Ref'];
			        
					var latOut = degreeToDecimal(lat, latDirection);
			        var lonOut = degreeToDecimal(lon, lonDirection);
	  		  		}
	  		  	else { console.log("gm error: " + error); }

	  		  	console.log(data + " is EXIF blob");
				console.log(latOut + " is latOut");
				console.log(lonOut + " is lonOut");
	  			console.log('1 '+ data.Compression);//jpeg
  	  			console.log('2 '+ cameraModel);  	//nexus
 		  		
 		  		// console.log(Date.now()+ " is 2");

 		  		res.json(data);


 			})
				// .gm(uploadPath).resize(100,100)
				// 		.write(writeStream, function(err){
				// 			if (!err) 
				// 			console.log('hooray');
				// 			else console.log('error time');
				// 		});
				// console.log(Date.now()+ " is 4");

				//var writeStream = fs.createWriteStream('./public/uploads/resized');	//console.log(Date.now()+ " is 3");


 				;
		});
	});
});

module.exports = router;