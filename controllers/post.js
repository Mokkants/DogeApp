"use strict";

const 
express = require('express'),
_ = require('underscore'),
router = express.Router();

let models = require('../models');
let Post = models.Post;

let access = require('../access-control');

router.get('/:id', getPost);
router.get('/', getAllPosts);
router.post('/', createPost);
router.put('/:id', updatePost);
router.patch('/:id', patchPost);
router.delete('/:id', deletePost);
module.exports = router;

function createPost(req, res, next) {
    if(access.isActionAllowed("create_post")){
        let post = new Post(
            {
                postedBy: access.currentUser.id,
                text: req.body.text,
                walker : null,
                time: {
                   created : Date.now(),
                   lastModified : Date.now(),
                   walkOrder :  Date.now()
                }
            }
        );
        post.save(function (err) {
            if (err) {
                return next(err);
            }
            res.status(201).json({'message':'Post Created successfully'});
        });
    }else{
        res.status(401).json({'message':'Unauthorized'});
    }
}

function getPost(req, res, next) {
    if(access.isActionAllowed("view_post")){
    Post.findById(req.params.id, function (err, post){
        if(err) return next(err);
        if(!post){
            res.status(404).json({"message": "Post not found"});
        }
        res.status(200).json(post);
    });
    } else{
        res.status(401).json({'message':'Unauthorized'});
    }
}

function getAllPosts(req, res, next){
    Post.find(function(err, posts){
        if(err) {return next(err);}
        res.json({"data": posts});
    });
}

function deletePost(req, res, next){
    Post.findOne({_id: req.params.id}, function(err, post){
        if (err) {return next(err);}
        if (post == null){return res.status(404).json({"message": "Post not found"});}

        console.log(access.isActionAllowed("delete_post"));
         console.log(post.postedBy);
         console.log(access.currentUser.id);

        if (access.isActionAllowed("delete_any_post") || 
        (access.isActionAllowed("delete_post") && post.postedBy == access.currentUser.id)){
            post.remove();
            res.status(204).json({"message":"Post removed successfully"});
        }else{
            res.status(401).json({"message":"Unauthorised."});
        }
    });
};

function updatePost(req, res, next) {
    Post.findById(req.params.id, function(err, post){
        if (err) {return next(err);}
        if (post == null) {
            return res.status(404).json({"message": "Post not found."});
        }
        if (access.isActionAllowed("update_any_post") || 
        (access.isActionAllowed("update_post") && post.postedBy == access.currentUser.id)){
           
            post.text = req.body.text;
            post.time.walkOrder = req.body.time.walkOrder;
            post.time.created = post.time.created; //We are not updating created time no matter what.
            post.time.lastModified = Date.now();
            post.walker = null; //Reset walker
            post.save();
            res.status(200).json(post);
        }else{
            res.status(401).json({'message':'Unauthorized'});
        }
    });
}

function patchPost(req,res,next) {
    Post.findById(req.params.id, function(err, post){
        let authorised = false; //triggers when any actionallowed is fulfilled
        if(access.isActionAllowed("assign_walker")){
            authorised = true;
            post.walker = access.isActionAllowed("assign_any_walker") ? req.body.walker : access.currentUser.id;
        } 
        if (access.isActionAllowed("modify_any_post") ||
        (access.isActionAllowed("modify_post") && post.postedBy==access.currentUser.id)){
            authorised = true;
            let body = _.omit(req.body, 'walker');
            let obj = {};
            Object.keys(body).forEach(function(key) {
                if(body[key]) obj[key] = body[key];
            });
            Object.assign(post, obj);
        }
        if(authorised){
            post.time.lastModified = Date.now();
            post.save();
            res.status(200).json(post);
        } else{
            res.status(401).json({'message':'Unauthorized'});
        }
    });
}
