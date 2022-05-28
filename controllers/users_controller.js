const User = require('../models/user');

module.exports.profile = function (req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(err){
                console.log('error in finding user in profile', err);
                return;
            }
            if(user){
                return res.render('profile', {
                    title : 'Profile page',
                    user : user
                })
            }
            return res.redirect('/users/sign-in');
        });
    }
    else{
        return res.redirect('/users/sign-in');
    }
   
}

module.exports.signUp = function (req,res){
    return res.render('user_sign_up',{
        title: 'Vivid | sign up'
    });
}


module.exports.signIn = function (req, res){
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

    // find the user

    // handle user found 
    // handle password which didnt match
    // handle session creation

    // handle user not found
    
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('error in finding user in signing in', err);
            return;
        }
        if(user){
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }else{
            return res.redirect('back');
        }
    })

};