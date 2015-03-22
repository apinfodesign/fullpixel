var router 	= require('express').Router();
var busboy 	= require('connect-busboy');
var fs 		= require('fs');
var gm 		= require('gm');

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
					var cameraModel;
					gm('./public/uploads/' + filename)
					.identify(function (err, data) {
				 	if (!err) {
				  			console.log("Selected EXIF elements: ");
		 		  			cameraModel = data["Profile-EXIF"].Model;
				  			console.log(cameraModel);
				  			console.log(filename);
				  			}
				  	//res.json(cameraModel);
					});
				}); //close fstream
		});
});
module.exports = router;


///  ON fstream.on CLOSE ( do gm find info, THEN res.json takes value of EXIF info.... then elsewhere assign that to ng-upload controller  )

