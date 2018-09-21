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

exports.post_all_details = function(req, res, next){
    Post.find(function(err, posts){
        if(err) {return next(err);}
        res.json({"data": posts});
    });
};

exports.post_delete = function(req, res, next){
    Post.findOneAndDelete({_id: req.params.id}, function(err, post){
        if (err) {return next(err);}
        if (post == null){
            return res.status(404).json(
                {"message": "Camel not found"});
        }
        res.json(camel);
    });
};

exports.post_add = function(req, res, next) {
    Post.findById(id, function(err, post){
        if (err) {return next(err);}
        if (post == null) {
            return res.status(404).json({"message": "Post not found."});
        }
        post.text = req.body.text;
        post.time = req.body.time;
        post.save();
        res.json(post);
    });
}


