"use strict";

const
express = require('express');
router = express.Router();

let models = require('../models');
let Dog = models.Dog;

router.get('/', postDog);
router.get('/', getAllDog);
router.get('/:user_id', getDog);
router.get('/:user_id', deleteDog);
module.exports = router;

founction postDog(req, res, next) { //here is syntex error but i can't find the reason
    let dog = new Dog ({
        id: req.body.dog_id,
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
}

function getAllDog(req, res, next) {
    Dog.find(function(err, dogs){
        if(err){
            return next(err);
        }
        res.json({
            "data": dogs
        });
    })
}

function getDog(req, res, next){
    Dog.findByOwner(req.params.user_id, function(err, dog){
        if(err) return next(err);
        if(dog == null){
            return releaseEvents.status(404).json(
                {"message": "Dog not found"}
            );
        }
        res.json(dog);
    })
}

function deleteDog(req, res, next){
    //dog needs ID to specify the exact entity which has to be deleted
    Dog.findOneAndDelete({id: req.params.dog_id}, function(err, dog){
        if(err) {
            return next(err);
        }
        if(dog == null){
            return res.status(404).json({"Message": "Dog not found"});
        }
    });
}
