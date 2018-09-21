"use strict";

const 
express = require('express'), 
_ = require('underscore'),
router = express.Router(),
access = require('../access-control');

let models = require('../models');
let User = models.User;

//Routes
router.post('/authenticate', authenticate);
router.post('/register', register);
module.exports = router;

function authenticate(req,res,next){
    let body = _.pick(req.query, "username");

    let userName = body.username;
    User.findOne({userName}).exec(function(e,user){
        if(!user){
            res.status(400).json("User does not exist.");
        }

        access.currentUser = user;
        access.currentUser.role = user.isWalker ? access.roles.walker : access.roles.owner;


        res.status(200).json(JSON.stringify(access.currentUser));

    });

}
  
function register(req,res,next){
    
    let body = req.query;
    let userName = body.userName
    
    User.find({userName}).exec(function(e,r){
        
        if(r){
            res.status(400).json("Username already taken!");
        }else{
            let user = new User();
            user.userName = userName;
            user.isWalker = body.isWalker;
            user.save();
            res.status(200).json(user);
        }
    });
}