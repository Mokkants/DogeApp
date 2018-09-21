"use strict";

const mongoose = require('mongoose');

let Dog = new mongoose.Schema({

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

module.exports = mongoose.model('Dog',Dog);
