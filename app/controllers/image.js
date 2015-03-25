var router = require('express').Router();
var busboy = require('connect-busboy');
var fs = require('fs');
var gm = require('gm');
 
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
 		  		
 		  		res.json(data);
 				})
 				.size
 				

		});
	});
});

var degreeToDecimal = function (coord, compass){ 
	//transorms standard degree min sec EXIF coord to decimal value, latitude or longitude
	//N and E compass positive, S and W compass negative
	var direction = 1;  // N or E
  	var decimalCoord; // return value
  	var elements = coord.split(",");//should give 3 element array>>> 45/1,31/1,54636/1000
	var degrees=elements[0].split("/"); //should give 2 element array 45,1 
    var finalDegrees = degrees[0]/degrees[1];
    var minutes = elements[1].split("/"); //should give 2 element array 31,1
    var finalMinutes = minutes[0]/minutes[1];
    var seconds = elements[2].split("/");  //should give 2 element array 54636/1000
    var finalSeconds = seconds[0]/seconds[1];
    if ((compass === "S")|| (compass === "W"))
    	{direction=-1 }; 
    decimalCoord = direction * (Math.abs(finalDegrees) + (finalMinutes/60.0) + (finalSeconds / 3600.0) );
    return decimalCoord;
 };

module.exports = router;