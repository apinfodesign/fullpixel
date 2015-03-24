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
			
			res.json( './public/uploads' + filename );

			// gm('./public/uploads/' + filename)
			// .identify(function (err, data) {
			//   if (!err) {
			//   	res.json(data);
			//   } 
			//   else { console.log(err); }
			//   console.log(data);
			//   res.json(data);
			// });
		});
	});
});
module.exports = router;