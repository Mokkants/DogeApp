"use strict";
const mongoose = require('mongoose'),
autoIncrement = require('mongoose-plugin-autoinc').autoIncrement;

let User = new mongoose.Schema({

    username : {
        type : String,
        required : true
    },
    name : {
        type: String,
        required:true,
        trim:true
    },
    location: {
        country:{
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        address:{
            type:String,
            required:true
        }
    },
    role: {
        type: String,
        enum : ['OWNER','WALKER','ADMIN'],
        default : 'OWNER'
    }
});

User.plugin(autoIncrement, { model: 'User', startAt: 1});

module.exports = mongoose.model('User', User);
