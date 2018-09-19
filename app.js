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

//Import models
let Dog = require('./models/dog.js')(mongoose);


//Home
app.get("/",function(req,res){
  res.send("API Root");
});



//db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  app.listen(port);
  console.log("Server is listening on port "+port);

});

