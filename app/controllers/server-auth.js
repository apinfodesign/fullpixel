var User = require('./user.js'),
    router = require('express').Router();

router.post('/user',function(req, res, next){
    var user = new User({username: req.body.username})
    bcrypt.hash(req.body.password, 10, function(err, hash){
        user.password = hash;
        user.save(function(err, user){
            if(err){ throw next(err) }
            res.send(201);
        });
    });
});

