require('dotenv').config();
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require("../../../models/user");
const bcrypt = require('bcrypt');
const passport = require('passport');
require('../../../config/passport')(passport);
const connection = require('../../../config/mysql_connection');


/********************************************************************************/
const { createUsersTable } = require('../../../models/user');

// Call the function to create the users table when the server starts
(async () => {
  try {
    await createUsersTable(connection);
    console.log('Database tables initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
    process.exit(1);
  }
})();
/********************************************************************************/

const {ensureAuthenticated} = require('../../../config/auth')

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

router.get("/", (request, response, next) => {
    response.render("login" )
})

router.get("/register", (request, response, next) => {
    response.render("register" )
});

router.get("/dashboard/index", (request, response, next) => {
    response.render("index" )
});

router.post('/login', (req,res,next)=>{
    passport.authenticate('local',{
        successRedirect : '/api/v1/dashboard/index',
        failureRedirect: '/api/v1/',
        failureFlash : true
    })(req,res,next);
  });
  
// router.post('/register', register);
router.post('/register', async (req,res,next)=>{
    const { name, email, password, password2, agreedToTos } = req.body;
    let errors = [];
  
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
        // Check exited user into database
        const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
          if (rows.length > 0) {
            errors.push({ msg: 'Email is already registered...', param: "email" });
            res.json({ errors });
          } else {
            const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
            // Insert new user into database
            await connection.query(
              'INSERT INTO users (name, email, password, agreedToTos) VALUES (?, ?, ?, ?)',
              [name, email, hashedPassword, agreedToTos]
            );
            console.log('User registered successfully');
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