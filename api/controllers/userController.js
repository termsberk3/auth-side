'use strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  User = mongoose.model('User');

exports.register = function(req, res) {
  var newUser = new User(req.body);
  newUser.save().then(function(user) {
    return res.json(user);
  }).catch(function(err) {
      return res.status(400).send({
        message: console.log(err)
      });
  });
};

exports.login = async (req, res) => {

  const {email, password} = req.body;
  const user = await User.findOne({ email: email})

  if(user === null){
    return res.json({message: 'User not found'})
  } else {
      if(user.password !== password){
        return res.json({message:"incorrect password"})
      }

      const payload = { email, name : req.body.name}
      jwt.sign(payload, "secret", (err, token)=>{
        if(err) return console.log(err)
        else{
          return res.send({token: token})
        }
      })

  }

};

exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {

    return res.status(401).json({ message: 'Unauthorized user!!' });
  }
};
exports.profile = function(req, res, next) {
  if (req.user) {
    res.send(req.user);
    next();
  } 
  else {
   return res.status(401).json({ message: 'Invalid token' });
  }
};