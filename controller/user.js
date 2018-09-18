var express = require('express');
var router = express.Router();
var user = require('../models/user');

var users = [];

app.post('/user', function(req, res, next){
    var new_user = {
        "id": users.length,
        "name": req.body.name,
        "city": req.body.city,
        "isDogOwner": req.body.isDogOwner,
    };
    user.save(function(err){
        if(err){ return next(err);}
        res.status(201).json(user);

    })
})

app.get('/user', function (req, res){
    res.json({"data": user})
})

app.get('/user/:id', function(req, res){
    res.json(user[req.params.id]);
});


module.exports = router
