// var User = require('../models/user'),
//     router = require('express').Router(),
// 	config = require('../../config');

//     router.get('/users/:username', function(req, res, next){
//     User.find({"username": req.params.username})
//         .lean()
//         .exec(function(err, users){

// //            console.log(typeof imgmetas);
//             if(err){ return next(err); }
//             res.json(users);
//         });
// });

// 	router.put('/users/:username', function(req, res){
// 		console.log("Updating User");
// 		User.update(
//     		{username: req.body.username},
//     		{$set: 
//     			{
//     				userpublicname: req.body.userpublicname, 
//     				userportrait: req.body.userportrait,
//     				userblogtitle: req.body.userblogtitle,
//     				useraboutstory: req.body.useraboutstory,
//     				usertags: req.body.usertags
//     			}
//     		})
// 	});