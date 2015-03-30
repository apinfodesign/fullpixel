var User = require('../models/user'),
    router = require('express').Router();

router.get('/member', function(req, res, next){
    User.find()
        .sort('-date')
        .exec(function(err, users){
            if(err){ return next(err);}
            res.json(users);
        });
});
module.exports = router;