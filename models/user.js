
module.exports = function(mongoose){


let userModel = new mongoose.Schema({

    
    user_id : {
        type: Number,
        required:true,
        },

    username : {
        type : String,
        required : true
    },
    password :{ 
        type : String,
        required: true
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