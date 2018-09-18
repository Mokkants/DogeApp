
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
     
    city : {
        type: String,
        required: true,
    },
 
    isDogOwner: {
        type: Boolean,
        required:true,
    }

});






return mongoose.model('user', userModel)

};