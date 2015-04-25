var http = require ('http');  //necssary?

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
 

// The http server will listen to an appropriate port, or default to
// port 5000.
var uristring = process.env.MONGOLAB_URI;	
var theport = process.env.PORT || 5000;

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
