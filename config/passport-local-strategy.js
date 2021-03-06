const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
    function(req, email, password, done){
        // find the user and establish identity
        User.findOne({email: email}, function(err, user){
            if(err){
                req.flash('error', err);
                console.log('error in finding user --> passport', err);
                return done(err);
            }
            if(!user || user.password != password){
                req.flash('error', 'Invalid username/password')
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


// check if user is authenticated

passport.checkAuthentication = function(req, res, next){
    // if the user is signed in then pass on request to next function
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not authenticated

    return res.redirect('/users/sign-in');

};

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req user contains the current signed in user from the sesion cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
};


module.exports = passport;