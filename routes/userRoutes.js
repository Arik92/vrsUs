var express = require('express');
var router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
// var User = require("../models/UserModel");


//the user routes go here
router.post('/join', function(req, res, next){
  User.register(new User({ username: req.body.username}), req.body.password, function(err, user){
    if (err) {
      console.log('Error registering!', err);
      return next(err);
    }
    req.login(user, function(err){
      if (err) {
      	return next(err);
      }
      res.send(req.user.username);
    });
  });
});
// router.get('/', function(req, res) {
//   res.sendFile(__dirname + '/public/index.html');
// });

router.post('/login', passport.authenticate('local'), function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user. 
  res.send(req.user.username)
});

// router.get('/success', function (req, res){
//   if (req.isAuthenticated()) {
//     res.send('Hey, ' + req.user + ', hello from the server!');
//   } else {
//     res.redirect('/login');
//   }
// });

router.get('/logout', function (req, res) {
  req.logout();
  res.send('Logged out!');
});

router.get('/currentuser', function (req, res){
  if (req.user) {
  	res.send(req.user.username)
  } else {
  	res.send(null)
  }
});

router.get('/facebook', 
  passport.authenticate('facebook', 
  	{ scope: 'email' }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


module.exports = router;