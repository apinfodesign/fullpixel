var db = require('./db');

var ImgMeta = db.model('ImgMeta', {
    userid : {type : Number, required : true},
    imgpath : {type : String, required : true},
    imgtitle : {type : String},
    imgdesc : {type : String},
    imgtag : {type : String},
    imgcamera : {type: String}
});
module.exports = ImgMeta;