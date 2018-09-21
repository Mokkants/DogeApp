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
var Dog = require('./models/index.js')(mongoose);


//Home
app.get("/",function(req,res){
  res.send("API Root");
});


//db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  app.listen(port);
  console.log("Server is listening on port "+port);

});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  var err_res = {
      "message": err.message,
      "error": {}
  };
  if (env === 'development') {
      err_res["error"] = err;
  }
  res.status(err.status || 500);
  res.json(err_res);
});