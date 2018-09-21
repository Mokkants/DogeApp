"use strict";

const 
express = require('express'),
router = express.Router();

let models = require('../models');
let Post = models.Post;

router.get('/:id', getPost);
router.get('/', getAllPosts);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
module.exports = router;

createPost = function (req, res) {
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

getPost = function(req, res) {
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

getAllPosts = function(req, res, next){
    Post.find(function(err, posts){
        if(err) {return next(err);}
        res.json({"data": posts});
    });
};

deletePost = function(req, res, next){
    Post.findOneAndDelete({_id: req.params.id}, function(err, post){
        if (err) {return next(err);}
        if (post == null){
            return res.status(404).json(
                {"message": "Camel not found"});
        }
        res.json(camel);
    });
};

updatePost = function(req, res, next) {
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


