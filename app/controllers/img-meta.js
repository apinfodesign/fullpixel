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
        path            : req.body.path,
        title           : req.body.title,
        caption         : req.body.caption,
        tags            : req.body.tags,
        camera          : req.body.camera,
        shutter         : req.body.shutter,
        aperture        : req.body.aperture,
        iso             : req.body.iso,
        date            : req.body.date

    });

    imgmeta.save(function(err, imgmetas){
        if(err){ return next(err); }
        res.status(201).json(imgmetas);
    });
});
module.exports = router;