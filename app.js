var express = require("express");
var bodyParser = require("body-parser");
var _ = require("underscore");

var app = express();
var port = process.env.PORT || 3000;


//Home
app.get("/",function(req,res){
  res.send("API Root");
});

app.listen(port);
console.log("Server is listening on port "+port);
