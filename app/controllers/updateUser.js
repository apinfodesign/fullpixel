var User = require('../models/user'),
    router = require('express').Router(),
	config = require('../../config');

	router.post('/updateUser', function(req, res){
		console.log("Updating User");
		User.update(
    		{username: req.body.username},
    		{$set: 
    			{
    				userpublicname: req.body.userpublicname, 
    				userportrait: req.body.userportrait,
    				userblogtitle: req.body.userblogtitle,
    				useraboutstory: req.body.useraboutstory,
    				usertags: req.body.usertags
    			}
    		})
	});