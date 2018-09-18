
module.exports = function(mongoose){


var userModel = new mongoose.Schema({

    
    id : {
        type: Number,
        required:true,
        },
    name : {
        type: String,
        required:true,
        trim:true
    },
     
    location: {
    country:{
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },

    coordinates: {
       latitude: {
           type: Number,
           required: true
       },
        longitude: {
            type: Number,
            required: true
       }
    }
   },
    
 
    isDogOwner: {
        type: Boolean,
        required:true,
    }

});






return mongoose.model('user', userModel)

};