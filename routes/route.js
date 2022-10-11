const passport = require('passport');
const express = require('express');
const router = express.Router();
//const router = express.Router()
//const db = require('../models/index');
 


const isAuth = (req, res, next) => { if  (req.user)
    {
    next();
  } else {
    res.redirect ('/auth/login');
  }
 };
  
   router.get('/dashboard',isAuth ,  (req, res) => {
      res.render('dashboard');
   });

//    router.get('/home', (req, res) => {
//     console.log(req.user);
//      res.render('home');
//   });

  
   router.get('/login', (req, res) => {
    if (req.user) {
      return res.redirect('/auth/dashboard');
   }else
     res.render('login');
  
    
  });
  
  
  router.get("/logout", function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect("/auth/login");
    });
  });
  
  router.get('/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }));
  
  router.get('/github/callback', 
    passport.authenticate('github', { failureRedirect: '/auth/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/auth/dashboard');
    }); 

    module.exports = router;