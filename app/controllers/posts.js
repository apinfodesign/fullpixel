var Post = require('../models/post');
var router = require('express').Router();

router.get('/posts', function(req, res, next){
   Post.find()
       .sort('-date')
       .exec(function(err, posts){
           if(err){
               return next(err);
           }
           res.json(posts);
       });
});

router.post('/posts', function(req, res, next){
    var post = new Post({
        "body" : req.body.body
    });
    post.save(function(err, posts){
        if(err){
            return next(err);
       }
        res.status(201).json(posts);
    });
});

module.exports = router;