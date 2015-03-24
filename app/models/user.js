var db =require('./db');

var User = db.model('User',{
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false, min: 8}
});

module.exports = User;

