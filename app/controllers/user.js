var User = require('../models/user'),
    jwt = require('jwt-simple'),
    bcrypt =require('bcrypt'),
    router = require('express').Router(),
    config = require('../../config');


router.get('/users', function(req, res, next){
    if(!req.headers['x-auth']){
        return res.sendStatus(401);
    }
    var auth =jwt.decode(req.headers['x-auth'], config.secret);
    User.findOne({username: auth.username},function(err, user){
        if(err){ return next(err); }
        console.log(auth.username + ' Im authorized!');   
        res.json(user);
    });
}); 

router.post('/users',function(req, res, next){
    var user = new User({username: req.body.username});
    bcrypt.hash(req.body.password, 10, function(err, hash){
        if(err){ return next(err); }
        user.password = hash;
        user.save(function (err){
            if(err){ return next(err); }
            res.sendStatus(201);
        });
    });
});



//User update functionality **************************
router.put('/users', function(req, res, next){
        console.log("Updating User");
        console.log(req.body);
        User.findOneAndUpdate({username: req.body.username},
            {$set: 
                {
                    username      : req.body.username,
                    userpublicname: req.body.userpublicname, 
                    userportrait  : req.body.userportrait,
                    userblogtitle : req.body.userblogtitle,
                    useraboutstory: req.body.useraboutstory,
                    usertags      : req.body.usertags
                
            }}, {upsert: true} , function() {});
            
    });

//****delete*************************

router.delete('/users', function(req, res, next){
        console.log("Updating User");
        console.log(req.body);
        User.remove({username: req.body.username}, function(){} );

     });



module.exports = router;
