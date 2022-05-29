const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport

passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(email, password, done){
        // find the user and establish identity
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log('error in finding user --> passport', err);
                return done(err);
            }
            if(!user || user.password != password){
                console.log('invalid username/password');
                return done(null, false);
            }

            return done(null, user);
        });
    }
));


// serialiser the user to decide that which key to be put in the cookie
passport.serializeUser(function(user, done){
    done(null, user.id);
});


// deserialiser the user from the key in the cookie
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('error in finding user --> passport deserialise', err);
            return done(err);
        }

        return done(null, user);
    })
});


module.exports = passport;