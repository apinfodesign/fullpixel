var User = require('../models/user'),
    router = require('express').Router(),
	config = require('../../config');

	router.post('/updateUser/', function(req, res){
		console.log("Updating User");
		User.update(
    		{username: req.username},
    		{$set: 
    			{
    				userpublicname: req.userpublicname, 
    				userportrait: req.userportrait,
    				userblogtitle: req.userblogtitle,
    				useraboutstory: req.useraboutstory,
    				usertags: req.usertags
    			}
    		});