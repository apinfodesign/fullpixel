var mongoose = require('mongoose');
var db = mongoose.connection;

//EXAMPLE OF MONGOLAB CONNECT STRING
//mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]

//FOR LOCAL DEPLOYMENT
//deleted for deployment
var mongolabConnectString =
"mongodb://mike1234:wtgttf789@ds037447.mongolab.com:37447/fullpixelmongolabdb";

//FOR HEROKU ENVIRONMENT ONLY
//var mongolabConnectString = "MONGOLAB_CONNECT"

mongoose.connect(mongolabConnectString, function(){
	db.on('error', console.error.bind(console, 'connection error:')); //not logging error

    db.once('open', function(){
        console.log("Successfully connected to MongoDB for FullPixel at Monglolabs.com");
    });
});
module.exports = mongoose;

