var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.sendFile('/Users/matthewcordeiro/Desktop/PCS-projects/FullPixel/public/partials/index.html');
});
router.get('/app.js', function (req, res) {
    res.sendFile('/Users/matthewcordeiro/Desktop/PCS-projects/FullPixel/public/app.js');
});
//router.use(express.static(__dirname + '/public'));
//TODO this is not working => no idea why??

module.exports = router;