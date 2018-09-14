module.exports = function(mongoose){

    var Post = new mongoose.Schema({

        postedBy : {
            type: String,
            required:true,
            trim: true
        },
        text : {
            type: String,
            required: true
        },
        walker : {
            type: Boolean,
            default: true
        },
        time : {
            type : String,
            trim : true
        }

        status : {
            type : time,
            trim : true
        }

    });

    return mongoose.model('Post',Post);

}