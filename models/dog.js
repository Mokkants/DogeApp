"use strict";
const mongoose = require('mongoose'),
autoIncrement = require('mongoose-plugin-autoinc').autoIncrement;

let Dog = new mongoose.Schema({

    owner: {
        type: mongoose.Schema.Types.Number,
        ref: 'User',
        required: true
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

Dog.plugin(autoIncrement, { model: 'Dog', startAt: 1});

module.exports = mongoose.model('Dog',Dog);