const Post = require('../models/posts');

module.exports.home = function(req, res){
    //console.log(req.cookies);

    //Post.find({}, function(err, posts){
    //     if(err){
    //         console.log('error in finding the posts', err);
    //         return;
    //     }
    //     console.log(posts);
    //     return res.render('home', {
    //         title: 'shashanks vivid | Home ',
    //         posts: posts
    //     });
    // });


    // populate the user so that we can access user properties
    Post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    })
    .exec(function(err, posts){
        if(err){
            console.log('error in finding the posts', err);
            return;
        }
        console.log(posts);
        return res.render('home', {
            title: 'shashanks vivid | Home ',
            posts: posts
        });
    });

    

}