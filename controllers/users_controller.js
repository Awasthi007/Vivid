const User = require('../models/user');

module.exports.profile = function (req, res){
    return res.render('profile', {
        title : 'Profile Page'
    });
}

module.exports.signUp = function (req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: 'Vivid | sign up'
    });
}


module.exports.signIn = function (req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('User_sign_in', {
        title : 'Vivid | sign in'
    });
}

// get the sign up data

module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email}, function(err, user){
        if(err){
            console.log('error in finding the user');
            return;
        }

        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in creating user', err);
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else {
            return res.redirect('back');
            }
    });
     
};
// sign in and create the session for user
module.exports.createSession = function(req, res){

    return res.redirect('/');

};