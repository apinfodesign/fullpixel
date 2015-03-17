var express = require('express');
var router = express.Router();

router.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});
router.get('/', function(req, res){
    res.sendFile('/Users/michaelmontero/Desktop/fullpixel/public/partials/index.html');
    console.log('home page.');
});


module.exports = router;