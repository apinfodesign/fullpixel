var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/FullPixel', function(){
	db.on('error', console.error.bind(console, 'connection error:')); //not logging error

    db.once('open', function(){
        console.log("Successfully connected to MongoDB FullPixel!");
    });
});
module.exports = mongoose;