var mongoose = require('mongoose');
var db = mongoose.connection;
 
//FOR LOCAL DEPLOYMENT
//deleted for deployment
 
//FOR HEROKU ENVIRONMENT ONLY
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

