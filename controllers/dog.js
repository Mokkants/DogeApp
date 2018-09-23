"use strict";

const 
express = require('express'),
router = express.Router();

let models = require('../models');
let Dog = models.Dog;

router.post('/', createDog);
router.get('/', getAllDogs);
router.get('/:id', getDog);
router.put('/:id', updateDog);
router.delete('/:id', deleteDog);
module.exports = router;

function createDog(req, res, next) {
    let dog = new Dog(
        {
            owner: req.body.owner,
            name: req.body.name,
            breed: req.body.breed,
            isSocial: req.body.isSocial,
            shortInfo: req.body.shortInfo
        }
    );
    dog.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Dog Info created successfully')
    })
}
function getAllDogs(req, res, next){
    Dog.find(function(err, dog){
        if(err){
            return next(err);
        }
        res.json({
            "data": dog
        });
    });
}

function getDog(req, res, next) {
    Dog.findById(req.params.id, function (err, dog){
        if(err) return next(err);
        if(dog == null){
            return res.status(404).json(
                {"message": "Dog not found"}
            );
        }
        res.send(dog);
    })
}



function deleteDog(req, res, next){
    Dog.findOneAndDelete({_id: req.params.id}, function(err, dog){
        if (err) {
            return next(err);
        }
        if (dog == null){
            return res.status(404).json(
                {"message": "Dog not found"});
        }
        res.json(dog);
    });
};

function updateDog(req, res, next) {
    Dog.findById(id, function(err, dog){
        if (err) {return next(err);}
        if (dog == null) {
            return res.status(404).json({"message": "Dog not found."});
        }
        dog.name = req.body.name;
        dog.breed = req.body.breed;
        dog.isSocial = req.body.isSocial;
        dog.shortInfo = req.body.shortInfo;
       
        dog.save();
        res.json(dog);
    });
}
