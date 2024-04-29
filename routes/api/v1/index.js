require('dotenv').config();
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require("../../../models/user");
const bcrypt = require('bcrypt');
const passport = require('passport');

const {ensureAuthenticated} = require('../../../config/auth')

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

router.get("/", (request, response, next) => {
    response.render("login" )
})

router.get("/register", (request, response, next) => {
    response.render("register" )
})

router.post('/login', (req,res,next)=>{
    passport.authenticate('local',{
        successRedirect : '/api/v1/dashboard/index',
        failureRedirect: '/api/v1/',
        failureFlash : true
    })(req,res,next)
  })
  

  router.post('/register', async (req, res) => {
    console.log("Check Point for registration");
    const { name, email, password, password2, agreedToTos } = req.body;
    let errors = [];
    console.log('Name: ' + name + ' Email: ' + email + ' Password: ' + password + ' AgreedToTos: ' + agreedToTos);
  
    // Validation checks
    if (!name || !email || !password || !password2) {
      errors.push({ msg: "Please fill in all fields...", param: "email" });
    }
    if (password !== password2) {
      errors.push({ msg: "Passwords do not match...", param: "password2" });
    }
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters long...', param: "password" });
    }
    if (agreedToTos !== "on") {
      errors.push({ msg: "You must agree to the terms and conditions...", param: "agreedToTos" });
    }
  
    if (errors.length > 0) {
      console.log(errors);
      res.json({ errors });
    } else {
      try {
        // Check if user with the same email exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          errors.push({ msg: 'Email is already registered...', param: "email" });
          res.json({ errors });
        } else {
          // Hash the password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
  
          // Create new user
          const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            agreedToTos,
            accountAuthorizedByAdmin: false
          });
  
          console.log(newUser);
          res.json({ returnUrl: '/api/v1/dashboard/index' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
      }
    }
  });


router.get('/logout', ensureAuthenticated,(req,res)=>{
    req.logout();
    req.flash('success_msg','Now logged out');
    res.redirect('/api/v1/'); 
})


module.exports = router;