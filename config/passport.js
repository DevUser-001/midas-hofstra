const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'email'},(email,password,done)=>{
            //match user
            User.findOne({email:email})
            .then((user)=>{
                if(!user){
                    console.log("Gebruiker niet gevonden");
                    return done(null,false,{message:'Dit eemail-adres is bij ons niet bekend'});

                } else if(user && user.accountAuthorizedByAdmin == false){
                    console.log("Gebruiker gevonden maar niet bevoegd");
                    return done(null,false,{message:'Niet bevoegd'});
                } 
            
                //math passwords
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err) throw err;
                    if(isMatch){
                        return done(null,user);
                    } else{
                        return done(null,false,{message: 'Wachtwoord match niet...'});
                    }
                })
            })

            .catch((err)=>{console.log(err)})
        })
    )
    passport.serializeUser(function(user,done) {
        done(null,user.id);
    })
    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            done(err,user);
        })
    })
}