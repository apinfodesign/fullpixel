var router = require('express').Router();
var busboy = require('connect-busboy');
var fs = require('fs');

router.post('/api/user/upload', function(req, res, next){
	var fstream;
	req.pipe(req.busboy);
	req.busboy.on('file', function(fieldname, file, filename){
		console.log('uploading........' +filename);
		fstream = fs.createWriteStream('./public/uploads/' + filename);
		file.pipe(fstream);
		fstream.on('close', function(){
			console.log('upload stream closed');
			//res.redirect('back');
			res.json('whoo hoo');
		});
	});
});
module.exports = router;