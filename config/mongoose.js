var config = require('./config'),
	mongoose = require('mongoose');

	//var api = require('./config/mongoose.js');

//load the database via local host

// module.exports = function() {
// 	var db = mongoose.connect(config.db);
// 	return db;
// };

mongoose.connect('mongodb://localhost/test', function(){
	console.log('CONNECTED');
});  //connect to the database
var express = require('express');
var router = express.Router();              // get an instance of the express Router


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	var userSchema = mongoose.Schema({
		username: String,
		password: String,
		email: String
	})
	var User = mongoose.model('User', userSchema);

	//register 
	router.post('/register', function(req, res) {
		User.find(function (err, users) {
			if (!users.some(function (elem) {
				return elem.username === req.body.username;
			})) {
				var newUser = new User({ username: req.body.username, password: req.body.password, email: req.body.email });
				newUser.save(function (err, newUser) {
				  if (err) {return console.error(err);}
				  else {
				  	console.log('User Added');
				  	res.json({added: true});
				  }
				});
			} else {
			  	console.log('User not added, username already exists');
				res.json({added: false});
			}
		});	
	});
	
	router.post('/login', function(req, res) {
		User.find(function (err, users) {
			if (users.some(function (elem) {
				return elem.username === req.body.username && elem.password === req.body.password;
			})) {
				console.log('Logged in')
				res.json({loggedIn: true});
			} else {
			  	console.log('Not logged in');
				res.json({loggedIn: false});
			}
		});	
	});
});

module.exports = router;
