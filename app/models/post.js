var db = require('./db');

var Post = db.model('Posts', {
    body : {type : String, required : true},
    date : {type : Date, required : true, default : Date.now}
});
module.exports = Post;