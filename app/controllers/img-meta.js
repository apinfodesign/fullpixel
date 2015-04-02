var ImgMeta = require('../models/img-meta'),
    router  = require('express').Router();

router.get('/img-meta/:username', function(req, res, next){
    ImgMeta.find({"username": req.params.username})
        .lean()
        .exec(function(err, imgmetas){

//            console.log(typeof imgmetas);
            if(err){ return next(err); }
            res.json(imgmetas);
        });
});
router.post('/img-meta', function(req, res, next){
    var imgmeta = new ImgMeta({
        username        : req.body.username,
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
