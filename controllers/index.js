"use strict";

const 
express = require('express'),
bodyParser = require('body-parser').json(),
router = express.Router();

router.get('/api', function(req, res) {
    res.json({"message": "Welcome to your DIT341 backend project!"});
});

router.use(bodyParser);
router.use('/api/login', require('./login'));
router.use('/api/user', require('./user'));
router.use('/api/post', require('./post'));
router.use('/api/dog', require('./dog'));

module.exports = router;