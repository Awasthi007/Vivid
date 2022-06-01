const Post = require('../models/posts');
const User = require('../models/user');

// module.exports.home = function(req, res){
//     //console.log(req.cookies);

//     //Post.find({}, function(err, posts){
//     //     if(err){
//     //         console.log('error in finding the posts', err);
//     //         return;
//     //     }
//     //     console.log(posts);
//     //     return res.render('home', {
//     //         title: 'shashanks vivid | Home ',
//     //         posts: posts
//     //     });
//     // });


//     // populate the user so that we can access user properties
//     Post.find({})
//     .populate('user')
//     .populate({
//         path : 'comments',
//         populate : {
//             path : 'user'
//         }
//     })
//     .exec(function(err, posts){
//         if(err){
//             console.log('error in finding the posts', err);
//             return;
//         }
//         User.find({}, function(err, users){
//             console.log(posts);
//             return res.render('home', {
//                 title: 'Vivid | Home ',
//                 posts: posts,
//                 all_users: users
//             });
//         });
        
//     });

    

// }

module.exports.home = async function(req, res){
    try{

        let posts = await Post.find({})
        .populate('user')
        .populate({
            path : 'comments',
            populate : {
                path : 'user'
            }
        })
        
        let users = await User.find({});
        return res.render('home', {
            title: 'Vivid | Home ',
            posts: posts,
            all_users: users
        });
           

    }catch(err){
        console.log('error occured in home contr', err);
        return;
    }
}