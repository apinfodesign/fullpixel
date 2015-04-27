var mongoose = require('mongoose');
var db = mongoose.connection;
var uristring;

//require('./mongolabinfo.js');  //if local env


try{
	//require('./mongolabinfo.js');
	uristring = require('./mongolabinfo.js').name;
}
catch(err){
	console.log("no connection file so go on to Heroku config var")
	uristring = process.env.MONGOLAB_URI;   //if Heroku env
}


// if (!uristring){   //if operating in local env
// 	uristring = connectstring.name;
// 	console.log('not reading Heroku config var so local is happening');
// };
//otherwise, we are in Heroku env

console.log("uristring is "+ uristring);

mongoose.connect( uristring , function(){
	db.on('error', console.error.bind(console, 'connection error:')); 
	//not logging error
    db.once('open', function(){
        console.log("Successfully connected to MongoDB for FullPixel at Monglolabs.com");
    });
});
 
module.exports = mongoose;
