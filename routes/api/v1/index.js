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
  

router.post('/register', (req,res)=>{
    console.log("Check Point for registration")
    const {name, email, password, password2, agreedToTos} = req.body;
    let errors = [];
    console.log(' Name ' + name + ' email :' + email + ' pass:' + password + ' AgreedToTos:' + agreedToTos);
    if(!name || !email || !password || !password2) {
        errors.push({msg : "Vul alle velden in...", param: "email"})
    }
    if(password !== password2) {
        errors.push({msg : "Wachtwoord matcht niet...", param: "password2"});
    }
    if(password.length < 6 ) {
        errors.push({msg : 'Wachtwoord moet minimaal 6 tekens lang zijn...', param: "password"})
    }

    if(agreedToTos !== "on") {
        errors.push({msg : "U moet akkoord gaan met de voorwaarden...", param: "agreeedToTos"});
    }

    if(errors.length > 0 ) {
        console.log(errors);
    res.json({
        errors : errors})
     } else {
       User.findOne({email : email}).exec((err,user)=>{
        console.log(user);   
        if(user) {
            errors.push({msg: 'Email is al reeds aangemeld...', param: "email"});
            res.json({errors})  
           } else {
            const newUser = new User({
                name : name,
                email : email,
                password : password,
                agreedToTos : agreedToTos,
                accountAuthorizedByAdmin: false
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
                    res.json({returnUrl:'/api/v1/dashboard/index'});
                    })
                    .catch(value=> console.log(value));
                      
                }));
            }
        })
    }})


router.get('/logout', ensureAuthenticated,(req,res)=>{
    req.logout();
    req.flash('success_msg','Now logged out');
    res.redirect('/api/v1/'); 
})


module.exports = router;