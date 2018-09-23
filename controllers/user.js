
"use strict";

const 
express = require('express'),
router = express.Router();

let models = require('../models');
let User = models.User;

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
module.exports = router;

function createUser(req, res, next) {
    let user = new User(
        {
            username: req.body.username,
            name: req.body.name,
            location: req.body.location,
            isWalker: req.body.isWalker
        }
    );
    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('User Created successfully')
    })
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
    User.findOneAndDelete({_id: req.params.id}, function(err, user){
        if (err) {return next(err);}
        if (user == null){
            return res.status(404).json(
                {"message": "User not found"});
        }
        res.json(user);
    });
}

function updateUser(req, res, next) {
    User.findById(id, function(err, user){
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
}


