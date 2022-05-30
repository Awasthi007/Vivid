const Comment = require('../models/comment');
const Post = require('../models/posts');


module.exports.create = function(req,res){
    Post.findById(req.body.post, function(err, post){
        if(err){
            console.log('error in finding post', err);
            return;
        }
        if(post){
            Comment.create({
                content: req.body.content,
                post : req.body.post,
                user: req.user._id
            }, function(err, comment){
                if(err){
                    console.log('comment cannot be added', err);
                    return;
                }

                post.comments.push(comment);  // adding comment to post
                post.save();   //we need to save..we must

                res.redirect('/');

            });
        }
    });
}