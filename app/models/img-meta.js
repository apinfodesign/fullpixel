var db = require('./db');


var ImgMeta = db.model('ImgMeta', {
    userid : {type : Number},
    imgpath : {type : String},
    imgtitle : {type : String},
    imgdesc : {type : String},
    imgtags: {type : String}
});
module.exports = ImgMeta;