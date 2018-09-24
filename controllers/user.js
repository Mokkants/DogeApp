
"use strict";

const 
express = require('express'),
router = express.Router();

let models = require('../models');
let User = models.User;
let access = require('../access-control');


router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
module.exports = router;

function createUser(req, res, next) {
    User.findOne({username:req.body.username}).exec(function(err, user){
        if(!user){
            //double equals because it's string to boolean comparison
            let role = req.body.isWalker == true ? 'WALKER' : 'OWNER';
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
                res.status(201).json({"message":"User Created successfully"});
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
        res.json({"data": users});
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
        res.send(user);
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
            user.username = req.body.username,
            user.name = req.body.name;
            user.location = req.body.location;
            user.isWalker = req.body.isWalker;
           
            user.save();
            res.json(user);
        });
    }else{
        res.status(401).json({"message":"Unauthoirzed"});
    }
    
}


