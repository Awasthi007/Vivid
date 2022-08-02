const Comment = require('../models/comment');
const Post = require('../models/posts');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
const Like = require('../models/like');

// module.exports.create = function(req,res){
//     Post.findById(req.body.post, function(err, post){
//         if(err){
//             console.log('error in finding post', err);
//             return;
//         }
//         if(post){
//             Comment.create({
//                 content: req.body.content,
//                 post : req.body.post,
//                 user: req.user._id
//             }, function(err, comment){
//                 if(err){
//                     console.log('comment cannot be added', err);
//                     return;
//                 }

//                 post.comments.push(comment);  // adding comment to post
//                 post.save();   //we need to save..we must

//                 res.redirect('/');

//             });
//         }
//     });
// }


module.exports.create = async function(req,res){
    try{

        let post = await Post.findById(req.body.post);

        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post : req.body.post,
                user: req.user._id
            });
            //console.log('********8',req.user._id,comment);
            post.comments.push(comment);  // adding comment to post
           
            post.save();   //we need to save..we must
            
            //console.log("fdfdfdsfdfdfdfdfdf", comment);
            comment = await comment.populate('user', 'name email');
            //commentsMailer.newComment(comment);
           
            let job = queue.create('emails', comment).save(function(err){
                if(err){
                    console.log('error in sending to the queue', err);
                    return;
                }

                console.log('job enqueued', job.id);
            })

            if (req.xhr){
                
                console.log('shshshsh')
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }

            req.flash('success', 'Comment added successfully');
    
           return res.redirect('/');
        }
        }catch(err){
            req.flash('error', 'Comment couldn\'t be added');
        console.log('error occcured in comments contr', err);
        return res.redirect('back');
    }


}
    













// module.exports.destroy = function(req,res){
//     Comment.findById(req.params.id, function(err, comment){

//         if(err){
//             console.log('error in finding comment', err);
//             return;
//         }
//         //console.log(req.user);
//        // console.log('000000',comment);
//         if(comment.user == req.user.id){
//             let postId = comment.post;
//             comment.remove();

//             Post.findByIdAndUpdate(postId, {$pull : {comments : req.params.id}}, function(err, post){
//                 if(err){
//                     console.log('error in pulling out comment', err);
//                     return;
//                 }
//                 return res.redirect('back');
//             });
//         } else {
//             return res.redirect('back');
//         }
//     });
// }


module.exports.destroy = async function(req,res){

    try{
        let comment = await Comment.findById(req.params.id);
        //console.log(req.params.id);
       
            //console.log('00000000000000',comment);
        
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
    
           await Post.findByIdAndUpdate(postId, {$pull : {comments : req.params.id}});
           await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

           if(req.xhr){
            console.log('opopop');
            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                messeage: 'Post deleted'
            });
           }


           req.flash('error', 'Comment deleted successfully');
           return res.redirect('back');
        } else {
            req.flash('error', 'Comment couldn\'t be deleteddd');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', 'Comment couldn\'t be deleted');
        console.log('error occured in comments contr', err);
        return res.redirect('back');
    }
    
}