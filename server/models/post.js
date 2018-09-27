const 
mongoose = require ('mongoose'),
autoIncrement = require('mongoose-plugin-autoinc').autoIncrement;

let Schema = mongoose.Schema;

let Post = new Schema({
    postedBy: {
      type:   Schema.Types.Number,
      ref: 'Owner',
      required: true
    },
    text: {
        type: String
    },
    walker: {
        type: Schema.Types.Number,
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

Post.plugin(autoIncrement, { model: 'Post', startAt: 1});

module.exports = mongoose.model('Post', Post);