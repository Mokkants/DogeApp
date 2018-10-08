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
module.exports = router;

function authenticate(req,res,next){
    let body = _.pick(req.body, "username");

    let userName = body.username;
    User.findOne({username:userName}).exec(function(e,user){
        if(!user){
            res.status(400).json({"message":"User does not exist."});
        } else{
            access.currentUser.id = user.id;
            access.currentUser.role = access.roles[user.role];            
            res.status(200).json({user});
        }
    });

}