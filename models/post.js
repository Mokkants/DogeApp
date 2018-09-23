const 
mongoose = require ('mongoose');

let Schema = mongoose.Schema;

let postSchema = new Schema({
    postedBy: {
      type:   Schema.Types.ObjectId,
      ref: 'Owner',
      required: true
    },
    text: {
        type: String
    },
    walker: {
        type: Schema.Types.ObjectId,
        ref: 'Walker',
    },
    time: {
        created : {
            type:Date,
            required: true
        },
        lastModified : {
            type: Date,
        },
        walkOrder : {
            type: Date,
            required: true
        }
    }
});

module.exports = mongoose.model('Post', postSchema);