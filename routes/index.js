const express = require('express');
const router = express.Router();
const post_rounter = require('./post.route')


router.get('/', function (req, res){
    res.json({"message": "HOMEPAGE!!"})
});

router.use('/posts', post_rounter);
module.exports = router