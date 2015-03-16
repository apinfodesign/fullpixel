var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/FullPixel', function(){
    console.log('FullPix MongoDB connected.');
});
module.exports = mongoose;