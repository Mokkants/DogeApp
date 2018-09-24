"use strict";

const 
express = require('express'),
router = express.Router(),
_ = require('underscore'),
access = require('../access-control');

let models = require('../models');
let Dog = models.Dog;


router.post('/', createDog);
router.get('/', getAllDogs);
router.get('/:id', getDog);
router.put('/:id', updateDog);
router.patch('/:id', patchDog);
router.delete('/:id', deleteDog);
module.exports = router;

function createDog(req, res, next) {
    if(access.isActionAllowed('create_dog')){
        let dog = new Dog({
                owner: access.currentUser.id,
                name: req.body.name,
                breed: req.body.breed,
                isSocial: req.body.isSocial,
                shortInfo: req.body.shortInfo
        }).save(function (err) {
            if (err) {
                return next(err);
            }
            res.status(201).json({'message':'Dog created successfully'});
        });
        
    } else{
        res.status(401).json({"message":"Unauthorised"});
    }
}
function getAllDogs(req, res, next){
    Dog.find(function(err, dog){
        if(err){return next(err);}
        res.status(200).json({"data": dog});
    });
}

function getDog(req, res, next) {
    Dog.findById(req.params.id, function (err, dog){
        if(err) return next(err);
        if(!dog){return res.status(404).json({"message": "Dog not found"});}
        res.status(200).json(dog);
    })
}

function deleteDog(req, res, next){
    Dog.findOne({_id: req.params.id}, function(err, dog){
        if (err) {return next(err); }
        if (!dog){return res.status(404).json({"message": "Dog not found"});}
        if(access.isActionAllowed('delete_dog') && dog.owner == access.currentUser.id){
            dog.remove();
            res.status(204).json({"message":"Dog was deleted successfully."});
        }else{
            res.status(401).json({"message":"Unauthorised"});
        }
    });
}

function updateDog(req, res, next) {
    Dog.findById(req.params.id, function(err, dog){
        if (err) {return next(err);}
        if (dog == null) { res.status(404).json({"message": "Dog not found."});}
        if(access.isActionAllowed('update_dog') && dog.owner == access.currentUser.id){
        dog.name = req.body.name;
        dog.breed = req.body.breed;
        dog.isSocial = req.body.isSocial;
        dog.shortInfo = req.body.shortInfo;
        dog.save();
        res.status(200).json(dog);
        } else{
            res.status(401).json({"message": "Unauthorised."});
        }
    });
}

function patchDog(req,res,next) {
    Dog.findById(req.params.id, function(err, dog){
        if (access.isActionAllowed("modify_any_dog") ||
        (access.isActionAllowed("modify_dog") && dog.owner==access.currentUser.id)){
            let body = _.omit(req.body, 'owner');
            let obj = {};
            Object.keys(body).forEach(function(key) {
                if(body[key]) obj[key] = body[key];
            });
            Object.assign(dog, obj).save();
            res.status(200).json(dog);
        } else{
            res.status(401).json({'message':'Unauthorized'});
        }
    });
}
