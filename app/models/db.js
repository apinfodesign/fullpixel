var mongoose = require('mongoose');
var db = mongoose.connection;

//keep mongolabs in .gitignore external file never uploaded to github
var connectstring = require('./mongolabinfo.js');
 console.log("Secret connectstring is: " + connectstring.name);

//EXAMPLE OF MONGOLAB CONNECT STRING
//mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]

//FOR LOCAL DEPLOYMENT
//Deleted for deployment
var mongolabConnectString=connectstring.name;	

//FOR HEROKU ENVIRONMENT ONLY
//var mongolabConnectString = "MONGOLAB_URI"


mongoose.connect(mongolabConnectString, function(){
	db.on('error', console.error.bind(console, 'connection error:')); //not logging error

    db.once('open', function(){
        console.log("Successfully connected to MongoDB for FullPixel at Monglolabs.com");
    });
});


module.exports = mongoose;
