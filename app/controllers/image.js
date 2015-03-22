var router = require('express').Router();
var busboy = require('connect-busboy');
var fs = require('fs');
var gm = require('gm');


router.post('/api/user/upload', function(req, res, next){
	var fstream;
	req.pipe(req.busboy);
	req.busboy.on('file', function(fieldname, file, filename){
		console.log('uploading........' +filename);
		fstream = fs.createWriteStream('./public/uploads/' + filename);
		file.pipe(fstream);


		gm('./public/uploads/' + filename)
		.identify(function (err, data) {
		  if (!err) {
		  			console.log("Seleted EXIF elements: ");
		  			console.log(data.Compression);
		  			console.log(data.Signature);
		  			console.log("...............");
		  			console.log("All EXIF DATA... ");
		  			console.log(data["Profile-EXIF"].Model);
		  			} 
		});


		fstream.on('close', function(){
			console.log('upload stream closed');
			//res.redirect('back');
			res.json('woo hoo');
		});
	});



});

 



module.exports = router;