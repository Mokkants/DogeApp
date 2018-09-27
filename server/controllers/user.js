
"use strict";

const 
express = require('express'),
router = express.Router(),
_ = require('underscore');

let models = require('../models');
let User = models.User;
let Dog = models.Dog;
let Post = models.Post;
let access = require('../access-control');


router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUser); 
router.put('/:id', updateUser);
router.patch('/:id', patchUser);
router.delete('/:id', deleteUser);
module.exports = router;

function createUser(req, res, next) {
    User.findOne({username:req.body.username}).exec(function(err, user){
        if(!user){
            let role = req.body.isWalker === "true" ?  'WALKER' : 'OWNER';
            let newUser = new User(
                {
                    username: req.body.username,
                    name: req.body.name,
                    location: req.body.location,
                    role: role
                }
            );
            newUser.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.status(201).json(newUser);
            });
            
        } 
        else{
            res.status(401).json({"message":"Username is taken!"});
        }
    });
}

function getAllUsers(req, res, next){
    User.find(function(err, users){
        if(err) {return next(err);}
        if(!users){return res.status(404).json("No users found");}
        res.status(200).json({"data": users});
    });
}

function getUser(req, res, next) {
    User.findById(req.params.id, function (err, user){
        if(err) return next(err);
        if(user == null){
            return res.status(404).json(
                {"message": "User not found"}
            );
        }
        res.status(200).send(user);
    })
}

function deleteUser(req, res, next){
    if(req.params.id == access.currentUser.id || access.isActionAllowed("delete_any_user")){
        User.findOneAndDelete({_id: req.params.id}, function(err, user){
            if (err) {return next(err);}
            if (user == null){
                return res.status(404).json(
                    {"message": "User not found"});
            }
            Dog.find({owner : user.id}).exec(function(err,dog){
                dog.forEach(function(d){
                    d.remove();
                });
            });
            Post.find({postedBy : user.id}).exec(function(err,post){
                post.forEach(function(p){
                    p.remove();
                });
            });
            res.status(204).json({"message": "User deleted."});
        });
    }else{
        res.status(401).json({"message":"Unauthorized"});
    }
}

function updateUser(req, res, next) {
    if(req.params.id == access.currentUser.id || access.isActionAllowed("update_any_user")){
        User.findById(req.params.id, function(err, user){
            if (err) {return next(err);}
            if (user == null) {
                return res.status(404).json({"message": "User not found."});
            }
            user.username = user.username,
            user.name = req.body.name;
            user.location = _.clone(req.body.location);
           
            user.save();
            res.status(200).json(user);
        });
    }else{
        res.status(401).json({"message":"Unauthoirzed"});
    }
    
}

function patchUser(req,res,next) {
    User.findById(req.params.id, function(err, user){
        if(err){return next(err);}
        if (user == null){return res.status(404).json({"message": "User not found"});}
        if (access.isActionAllowed("modify_any_user") ||
        (access.isActionAllowed("modify_user") && user.id==access.currentUser.id)){
            let body = _.omit(req.body,"isWalker");
            let obj = {};
            Object.keys(body).forEach(function(key) {
                if(body[key] != null && user.toObject().hasOwnProperty(key)){
                    obj[key] = body[key];
                } 
            });
            Object.assign(user, obj).save();
            res.status(200).json(user);
        } else{
            res.status(401).json({'message':'Unauthorized'});
        }
    });
}