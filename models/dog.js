module.exports = function(mongoose){


var dogModel = new mongoose.Schema({

    dog_id: {
        type: Number,
        required: true
    },
    owner: {
        type: Schema.Types.objectId,
        key: 'userModel',//The object can be accessed under the property 'userModel'
        keySource: 'user_id', // The object will be fetched using the value supplied under the property 'user_id'
        keyDestination: 'user_id',// The object will be serialized to the property 'user_id'
        relatedModel: userModel,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    breed: {
        type: String,
        required: true
    },
    isSocial: {
        type: Boolean,
        default: true
    },
    shortInfo: {
        type : String,
        trim : true
    }

});

return mongoose.model('dog', dogModel);

}
