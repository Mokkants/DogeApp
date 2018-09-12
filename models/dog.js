module.exports = function(mongoose){

    var Dog = new mongoose.Schema({

        name : {
            type: String,
            required:true,
            trim: true
        },
        breed : {
            type: String,
            required: true
        },
        isSocial : {
            type: Boolean,
            default: true
        },
        shortInfo : {
            type : String,
            trim : true
        }

    });

    return mongoose.model('Dog',Dog);

}