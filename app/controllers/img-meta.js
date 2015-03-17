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
        userid     : req.body.userid,
        imgpath    : req.body.imgpath,
        imgtitle   : req.body.imgtitle,
        imgdesc    : req.body.imgdesc,
        imgtag     : req.body.tag
    });
    imgmeta.save(function(err, imgmetas){
        if(err){ return next(err); }
        res.status(201).json(imgmetas);
    });
});
module.exports = router;