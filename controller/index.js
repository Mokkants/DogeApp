var express = require('express');
var router = express.Router()

router.get('/api', function(req, res) {
    res.json({"message": "Welcome to your DIT341 backend project!"});
});

// Insert routes below
router.use('/api/user', require('./user'));

// All other routes redirect to the index.html
router.route('/*').get(function (req, res) {
    res.sendfile(app.get('appPath') + '/index.html');
});

module.exports = router
