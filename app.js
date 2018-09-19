"use strict";

const 
  express = require("express"),
  bodyParser = require("body-parser"),
  _ = require("underscore"),
  mongoose = require('mongoose');

let app = express();
let port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/app', {useNewUrlParser: true});

let db = mongoose.connection;
let Schema = mongoose.Schema;

//TODO: remove models and access control from app.js
//They are only here for people to see how to call them
//Use both of these in the controllers when necessary

//Import models
let Dog = require('./models/dog.js')(mongoose);

//Access control
let access = require('./access-control');
let roles = access.roles;
access.isActionAllowed(roles.owner,"action");





//Home
app.get("/",function(req,res){
  res.send("API Root");
});

//db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  app.listen(port);
  console.log("Server is listening on port "+port);

});

