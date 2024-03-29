const Post = require('../../../models/posts');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res){

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path : 'comments',
            populate : {
                path : 'user'
            }
        })

    return res.json(200, {
        message: "List of post",f
        posts : posts
    });
}



module.exports.destroy = async function(req, res){ 
    try{

        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){
            post.remove();
            
            await Comment.deleteMany({post : req.params.id});

            
            return res.json(200, { 
                message: "Post and comments deleted"
            });
        }else{
            return res.json(401, {
                message: "You cant delete this post"
            });
        }
        

    }catch(e){
       //req.flash('error', 'Post couldn\'t be deleted');
        console.log('error occured in post contr', e);
        return res.json(500, {
            message: "internal server error"
        });
    }
}