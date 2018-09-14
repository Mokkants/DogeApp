const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

let PostSchema = new Schema({
    postedBy: {
      type:   OwnerSchema,
      required: true,
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