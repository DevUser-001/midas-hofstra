require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const User = require("../models/user");
const bcrypt = require('bcrypt');
const passport = require('passport');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const {ensureAuthenticated} = require('../config/auth')

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

router.get('/login', ensureAuthenticated, (req,res)=>{
    res.render('login');
})

router.get('/inloggen-zakelijk', ensureAuthenticated, (req, res) => {
    res.render('loginzakelijk');
})

router.get('/recover-account', ensureAuthenticated, (req,res)=>{
  res.render('recover');
})

router.post('/login', ensureAuthenticated, (req,res,next)=>{
  passport.authenticate('local',{
      successRedirect : '/dashboard',
      failureRedirect: '/users/login',
      failureFlash : true
  })(req,res,next)
})

router.post('/gatekeeper', (req,res,next)=>{
    passport.authenticate('local',{
        successRedirect : '/index',
        failureRedirect: '/',
        failureFlash : true
    })(req,res,next)
  })

router.get('/inschrijven', ensureAuthenticated, (req, res) => {
    res.render('inschrijven');
})

router.post('/inschrijven', ensureAuthenticated, (req,res)=>{
  const {bedrijfsnaam, email, contact, password, password2} = req.body;
  let errors = [];
  console.log(' Name ' + bedrijfsnaam + ' email :' + email+ ' pass:' + password);
  if(!bedrijfsnaam || !email || !password || !password2 || !contact) {
      errors.push({msg : "Please fill in all fields"})
  }
  //check if match
  if(password !== password2) {
      errors.push({msg : "passwords dont match"});
  }
  
  //check if password is more than 6 characters
  if(password.length < 6 ) {
      errors.push({msg : 'password atleast 6 characters'})
  }
  if(errors.length > 0 ) {
  res.render('inschrijven', {
      errors : errors,
      bedrijfsnaam : bedrijfsnaam,
      email : email,
      password : password,
      contact: contact,
      password2 : password2})
   } else {
      //validation passed
     User.findOne({email : email}).exec((err,user)=>{
      console.log(user);   
      if(user) {
          errors.push({msg: 'email already registered'});
          res.render('inschrijven',{errors,bedrijfsnaam,email,password,password2,contact})  
         } else {
          const newUser = new User({
              bedrijfsnaam : bedrijfsnaam,
              email : email,
              password : password,
              contact: contact
          });

  
          //hash password
          bcrypt.genSalt(10,(err,salt)=> 
          bcrypt.hash(newUser.password,salt,
              (err,hash)=> {
                  if(err) throw err;
                      //save pass to hash
                      newUser.password = hash;
                  //save user
                  newUser.save()
                  .then((value)=>{
                      console.log(value)
                  res.redirect('/users/login');
                  })
                  .catch(value=> console.log(value));
                    
              }));
           }
     })
  }
  })
//logout
router.get('/logout', ensureAuthenticated,(req,res)=>{
  req.logout();
  req.flash('success_msg','Now logged out');
  res.redirect('/users/login'); 
  })
module.exports  = router;