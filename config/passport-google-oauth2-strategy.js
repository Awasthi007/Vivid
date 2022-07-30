const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const User = require('../models/user');
// tell passport to use new strategy for google login
passport.use( new googleStrategy({
        clientID : '248545932190-8obb1tbtbmiiu58mu74590drpas8kroa.apps.googleusercontent.com',
        clientSecret : "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    
    },

    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email : profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log('error in google starategy passport',err);
                return;
            }

            console.log(profile);
            if(user){
                // if found set this user as request.user
                return done(null, user);
            }else{
                // if not found create the user and set it as request.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')

                }, function(err, user){
                    if(err){
                        console.log('error in creating user in google strategy passprt ', err);
                        return;
                    }
                    return done(null,user)
                })
            }
        });
    }

));

module.exports = passport;