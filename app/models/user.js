var db =require('./db');

var User = db.model('User',{
    username:   {type: String, required: true, unique: true},
    password:   {type: String, required: true, select: false, min: 8},
    userphoto:  {type: String},
    userportrait: {type: String},
    userblogtitle: {type: String, unique: true},
    useraboutstory: {type: String, max: 2000},
    usertags: {type: String}

});

module.exports = User;

