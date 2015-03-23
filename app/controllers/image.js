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
		
			gm('./public/uploads/' + filename)
			.identify(function (err, data) {
			  if (!err) {
			  	cameraModel = data["Profile-EXIF"].Model;

	  			console.log("Seleted EXIF elements: ");
	  			console.log(data);
	  			console.log('1 '+ data.Compression);  //jpeg
	  			console.log('2 '+ data.Signature);  //
  	  			console.log('3 '+ cameraModel);  //nexus
		  	//	res.json('!!! ' + cameraModel + ' !!!');
		  		res.json(data);
			  	} 
			});
		});
	});
});
module.exports = router;