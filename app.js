"use strict";

const 
  express = require("express"),
  bodyParser = require("body-parser"),
  _ = require("underscore"),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  path = require('path');
      
let app = express();
let port = process.env.PORT || 3000;
let mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/app';
let env = app.get('env');

// HTTP request logger
app.use(morgan('dev'));
// Parse requests of content-type 'application/json'
app.use(bodyParser.json());
// Serve static assets (for frontend client)
var root = path.normalize(__dirname + '/..');
app.use(express.static(path.join(root, 'client')));
app.set('appPath', 'client');

//Connect to MongoDB
mongoose.connect(mongoURI, {useNewUrlParser: true}, function(err){
  if (err){
    console.error(`Failed to connect to MongoDB with URI ${mongoURI}`);
    console.error(err.stack);
    process.exit(1);
  }
  console.log(`Connected to MongoDB with URI ${mongoURI}`);
});

let db = mongoose.connection;

//TODO: remove access control from app.js
//They are only here for people to see how to call them
//Use both of these in the controllers when necessary

//Access control
let access = require('./access-control');

console.log(access.currentUser);
console.log(access.isActionAllowed("")); //false

// Import routes
app.use(require('./controllers'));

//Basic error handling
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

//Home
app.get("/",function(req,res){
  res.send("API Root");
});

db.once('open', function() {
  app.listen(port);
  console.log("Server is listening on port "+port);
});
