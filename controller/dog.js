var express = require('express');
var router = express.Router();
var dog = require('../models/dog');

app.post('/dog', function(req, res){
    var dog = {
        "id": req.body.dog_id,
        //"owner_id": 
        "name": req.body.name,
        "breed": req.body.breed,
        "isSocial": req.body.isSocial,
        "shortInfo": req.body.shortInfo
    };
    dog.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Dog Info Created successfully')
    })
})

app.get('/dog', function(req, res, next){
    dog.find(function(err, dog){
        if(err){
            return next(err);
        }
        res.json({
            "data": dog
        });
    })
})

app.get('/dog:owner', function(req, res, next){
    dog.findByOwner(req.params.user_id, function(err, dog){
        if(err) return next(err);
        if(dog == null){
            return releaseEvents.status(404).json(
                {"message": "Dog not found"}
            );
        }
        res.json(dog);
    })
})

app.delete('/dog:dog_id', function(req, res, next){
    dog.findOneAndDelete({id: req.params.dog_id}, function(err, dog){
        if(err) {
            return next(err);
        }
        if(dog == null){
            return res.status(404).json({"Message": "Dog not found"});
        }
    })
})
module.exports = router;