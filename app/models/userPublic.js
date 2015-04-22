var db =require('./db');

var User = db.model('userPublic',{
    usernamePublic:   {type: String, required: true, unique: true},
    userpublicnamePublic:  {type: String},
    userphotoPublic:  {type: String},
    userportraitPublic: {type: String},
    userblogtitlePublic: {type: String, unique: true},
    useraboutstoryPublic: {type: String, max: 2000},
    usertagsPublic: {type: String}

});

module.exports = userPublic;