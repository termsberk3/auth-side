'use strict';

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,


  User = require('./api/models/userModel.js'),
  bodyParser = require('body-parser'),
  jsonwebtoken = require("jsonwebtoken");

const mongoose = require('mongoose');
const option = {
    socketTimeoutMS: 30000,
};

const mongoURI = process.env.MONGODB_URI;
mongoose.connect('mongodb+srv://termsberk38:381998Berk!@homework-cluster.tilf3zg.mongodb.net/?retryWrites=true&w=majority', option).then(function(){
    console.log("Connected to Mongo")
}, function(err) {
  console.log(err)
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});
var routes = require('./api/routes/userRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port);

console.log(' RESTful API server started on: ' + port);

module.exports = app;