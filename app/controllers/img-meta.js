var ImgMeta = require('../models/img-meta')
var router = require('express').Router();

router.get('/img-meta', function(req, res, next){
    ImgMeta.find()
        .exec(function(err, imgmetas){
            if(err){ return next(err); }
            res.json(imgmetas);
        });
});
router.post('/img-meta', function(req, res, next){
    var imgmeta = new ImgMeta({
        userid          : req.body.userid,
        path            : req.body.imgpath,
        title           : req.body.imgtitle,
        caption         : req.body.imgdesc,
        tags            : req.body.imgtags

    });

    imgmeta.save(function(err, imgmetas){
        if(err){ return next(err); }
        res.status(201).json(imgmetas);
    });
});
module.exports = router;