const Post = require('../models/product.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.post_create = function (req, res) {
    let post = new Post(
        {
            postedBy: req.body.postedBy,
            text: req.body.text,
            walker: req.body.walker,
            time: req.body.time
        }
    );
    post.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

exports.post_details = function(req, res) {
    Post.findById(req.params.id, function (err, post){
        if(err) return next(err);
        res.send(post);
    })
};

