var router = require('express').Router();

router.use('/posts',require('./posts'));
router.use('/', require('./routes'));

module.exports = router;