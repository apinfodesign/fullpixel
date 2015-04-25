var http = require ('http');  //necessary?

var mongoose = require('mongoose');
var db = mongoose.connection;
 
//FOR LOCAL DEPLOYMENT
//keep mongolabs in .gitignore external file never uploaded to github
//this is for local testing only


//EXAMPLE OF MONGOLAB CONNECT STRING
//mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]

//FOR HEROKU ENVIRONMENT ONLY
var mongolabConnectString = "MONGOLAB_URI"

// The http server will listen to an appropriate port, or default to
// port 5000.
var uristring = process.env.MONGOLAB_URI;	
var theport = process.env.PORT || 5	000;

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});
 

// mongoose.connect( uristring , function(){
// 	db.on('error', console.error.bind(console, 'connection error:')); //not logging error

//     db.once('open', function(){
//         console.log("Successfully connected to MongoDB for FullPixel at Monglolabs.com");
//     });
// });
 


module.exports = mongoose;
