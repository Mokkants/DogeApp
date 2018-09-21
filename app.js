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

//Access control
let access = require('./access-control');

console.log(access.currentUser);
console.log(access.isActionAllowed("")); //false


// Import routes
app.use(require('./controllers'));

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

//Home
app.get("/",function(req,res){
  res.send("API Root");
});

//db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  app.listen(port);
  console.log("Server is listening on port "+port);

});

