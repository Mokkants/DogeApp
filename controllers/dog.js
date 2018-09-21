"use strict";

const 
express = require('express'),
router = express.Router();
 
let models = require('../models');
let Dog = models.Dog;

router.post('/dog', function(req, res){
    let dog = new Dog({
        //"owner_id": 
        name: req.body.name,
        breed: req.body.breed,
        isSocial: req.body.isSocial,
        shortInfo: req.body.shortInfo
    });
    dog.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Dog Info Created successfully')
    })
})

router.get('/dog', function(req, res, next){
    Dog.find(function(err, dog){
        if(err){
            return next(err);
        }
        res.json({
            "data": dog
        });
    })
})

router.get('/dog:owner', function(req, res, next){
    Dog.findByOwner(req.params.user_id, function(err, dog){
        if(err) return next(err);
        if(dog == null){
            return releaseEvents.status(404).json(
                {"message": "Dog not found"}
            );
        }
        res.json(dog);
    })
})

router.delete('/dog:dog_id', function(req, res, next){
    Dog.findOneAndDelete({id: req.params.dog_id}, function(err, dog){
        if(err) {
            return next(err);
        }
        if(dog == null){
            return res.status(404).json({"Message": "Dog not found"});
        }
    })
})

module.exports = router;
