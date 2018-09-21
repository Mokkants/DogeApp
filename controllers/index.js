"use strict";

const 
express = require('express'),
router = express.Router();

router.get('/api', function(req, res) {
    res.json({"message": "Welcome to your DIT341 backend project!"});
});

router.use('/api/login', require('./login'));
router.use('/api/user', require('./user'));

module.exports = router;