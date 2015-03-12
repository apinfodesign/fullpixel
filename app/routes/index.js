var express = require('express'),
	router  = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/public/index.html');
});


module.exports = router;
