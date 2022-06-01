const Post = require('../models/posts');
const Comment = require('../models/comment');


// module.exports.create = function(req, res){

//     Post.create({
//         content : req.body.content,
//         user: req.user._id
//     }, function(err, post){
//         if(err){
//             console.log('error in creating a post', err);
//             return;
//         }
//         return res.redirect('back');
//     });
    
// }


module.exports.create = async function(req, res){

try{
    await Post.create({
        content : req.body.content,
        user: req.user._id
    });
    req.flash('success', 'Post created Successfully');
    return res.redirect('back');

}catch(err){
    req.flash('error', 'Post couldn\'t be created ');
    console.log('some error occured, posts contr', err);
    return res.redirect('back');
}
}











// module.exports.destroy = function(req, res){  // we will get post id from params
//     Post.findById(req.params.id, function(err, post){
//         if(err){
//             console.log('error in finding post for deleting', err);
//             return res.redirect('/');
//         }
//         // .id means converting the object id into string
//         //console.log(post);
//         //console.log('12345',req.user.id,'9999');
//         if(post.user == req.user.id){
//           post.remove();
//           console.log('here');
//           Comment.deleteMany({post : req.params.id}, function(err){
//                 if(err){
//                     console.log('cannot find comments associated with post',err);
                   
//                 }
//                 return res.redirect('/');
               
//             });
//         }else{
//             return res.redirect('back');
//         }
//     });
// }


module.exports.destroy = async function(req, res){ 
    try{

        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){
            post.remove();
            
            await Comment.deleteMany({post : req.params.id});
            req.flash('success', 'Post Deleted Successfully');
            return res.redirect('back');
          }else{
            req.flash('error', 'Post couldn\'t be deleted');
              return res.redirect('back');
          }

    }catch(e){
        req.flash('error', 'Post couldn\'t be deleted');
        console.log('error occured in post contr', e);
        return res.redirect('back');
    }
}