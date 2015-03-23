
var express = require('express'),
	router 	= express.Router(),
	path 	= require('path');


router.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});


router.get('/', function(req, res){ 
    res.sendFile(path.join(__dirname, '../../public/partials/index.html') );
    console.log('home page.');
});

module.exports = router;