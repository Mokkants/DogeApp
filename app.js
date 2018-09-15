var express = require("express");
var bodyParser = require("body-parser");
var _ = require("underscore");
var mongoose = require('mongoose');


var app = express();
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/app', {useNewUrlParser: true});

var db = mongoose.connection;
var Schema = mongoose.Schema;

//Import models
var Dog = require('./models/dog.js')(mongoose);
var post = require('.routes/post.route');

//Home
app.get("/",function(req,res){
  res.send("API Root");
});
app.use('/birds', birds);


//db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  app.listen(port);
  console.log("Server is listening on port "+port);

});

