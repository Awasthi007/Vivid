const User = require('../models/user');

module.exports.profile = function (req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('profile', {
            title : 'Profile Page',
            profile_user : user
        });
    })
   
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
        req.flash('error', 'Password and Confirm password do not match');
        return res.redirect('back');
    }

    User.findOne({email:req.body.email}, function(err, user){
        if(err){
            req.flash('error', 'Account couldn\'t be created');
            console.log('error in finding the user');
            return;
        }

        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in creating user', err);
                    return;
                }
                req.flash('success', 'Account created Successfully');
                return res.redirect('/users/sign-in');
            });
        }
        else {
            req.flash('error', 'User already Exist');
            return res.redirect('back');
            }
    });
     
};
// sign in and create the session for user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');

};

module.exports.destroySession = function(req,res){  // modified in the latest version
    
    req.logout(function(err){
       if(err){return next(err);}
       req.flash('success', 'Logged Out Successfully');

       return res.redirect('/');
   });
   
}

module.exports.update = function(req, res){
    if(req.user.id = req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            if(err){
                console.log('error in creating user', err);
            }
            req.flash('success', 'Updated Successfully');
            res.redirect('back');
        });
    } else {
        console.log('here');
        return res.status(401).send('Unauthorized');
    }
}