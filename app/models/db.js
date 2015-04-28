var mongoose = require('mongoose');
var db = mongoose.connection;
 var uristring;

try{
	uristring = require('./mongolabinfo.js').name;
}
catch(err){
	console.log("no connection file so go on to Heroku config var")
	uristring = process.env.MONGOLAB_URI;   //if Heroku env
}

console.log("uristring is "+ uristring);

mongoose.connect( uristring , function(){
	db.on('error', console.error.bind(console, 'connection error:')); 
 
    db.once('open', function(){
        console.log("Successfully connected to MongoDB for FullPixel at Monglolabs.com");
    });
});
 module.exports = mongoose;