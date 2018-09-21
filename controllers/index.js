"use strict";

const 
express = require('express'),
router = express.Router();

router.use('/api/login', require('./login'));

module.exports = router;