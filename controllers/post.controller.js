const Post = require('../models/product.model');

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
        if(post == null){
            return res.status(404).json(
                {"message": "Post not found"}
            );
        }
        res.send(post);
    })
};

