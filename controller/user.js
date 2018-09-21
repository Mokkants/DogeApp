let express = require('express');
let router = express.Router();
let user = require('../models/user');



router.post('/user', function(req, res, next){
    let new_user = {
        name: req.body.name,
        city: req.body.city,
        location: req.body.location,
        isDogOwner: req.body.isDogOwner,
    };
    router.save(function(err){
        if(err){ return next(err);}
        res.status(201).json(user);
        res.send('User was created succesfully');

    });
});
router.get('/user', function(req,res, next){
    user.find(function(err, user){
        if(err){return next(err);}
        res.json({"data": user});
    });
});

router.get('/user:id', function(req,res,next){
    user.findById(req.params.id), function(err, user){
        if(err) return next(err);
        if(user == null){
            return res.status(404).json(
                {"message": "User not found"}
            );
        }
    }
});

router.put('/user:id', function(req, res, next){
    let id = req.params.id;
    user.findById({id, function(err, user){
        if(err){ return next(err);}
        if (user == null){
            return res.status(404).json({"message": "User not found"});

        }
    }
});


router.delete('/user:id', function(req, res, next){
    let id = req.params.id;
    user.findOneAndDelete({user_id: id}), function(err, user){
        if(err) { return next(err); }
        if(user == null){
            return res.status(404).json({"message": "User not found"});
    }
}
});

});

module.exports = router;
