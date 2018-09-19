var express = require('express');
var router = express.Router();
var user = require('../models/user');



app.post('/user', function(req, res, next){
    var new_user = {
        "id": users.length,
        "name": req.body.name,
        "city": req.body.city,
        "location": req.body.location,
        "isDogOwner": req.body.isDogOwner,
    };
    user.save(function(err){
        if(err){ return next(err);}
        res.status(201).json(user);
        res.send('User was created succesfully');

    })
})
app.get('/user', function(req,res, next){
    user.find(function(err, user){
        if(err){return next(err);}
        res.json({"data": user});
    })
})

app.get('/user:id', function(req,res,next){
    user.findById(req.params.id), function(err, user){
        if(err) return next(err);
        if(user == null){
            return res.status(404).json(
                {"message": "User not found"}
            );
        }
    }
})

app.delete('/user:id', function(req, res, next){
    var id = req.params.id;
    user.findOneAndDelete({user_id: id}), function(err, user){
        if(err) { return next(err); }
        if(user == null){
            return res.status(404).json({"message": "User not found"});
    }
}
});




module.exports = router
