var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    postedBy: {
      type:   Schema.Types.ObjectId,
      ref: 'Owner',
      required: true
    },
    text: {
        type: String
    },
    walker: {
        type: WalkerSchema
    },
    time: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Post', PostSchema);