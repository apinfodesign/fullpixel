var mongoose = require('mongoose');
var db = mongoose.connection;
var connectstring = require('./mongolabinfo.js');

//FOR LOCAL DEPLOYMENT
//keep mongolabs in .gitignore external file never uploaded to github
//this is for local testing only

//EXAMPLE OF MONGOLAB CONNECT STRING
//mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
			
//FOR HEROKU ENVIRONMENT ONLY
//var mongolabConnectString = MONGOLAB_URI;

var uristring = process.env.MONGOLAB_URI;

if (!uristring){
	uristring = connectstring.name;
	console.log('not reading Heroku config var so local is happening');
};

console.log("uristring is "+ uristring);
 // Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.

mongoose.connect( uristring , function(){
	db.on('error', console.error.bind(console, 'connection error:')); //not logging error

    db.once('open', function(){
        console.log("Successfully connected to MongoDB for FullPixel at Monglolabs.com");
    });
});
 


module.exports = mongoose;
