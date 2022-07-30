const nodemailer = require('../config/nodemailer');

// this is another way of exporting a method

exports.newComment = (comment) => {
    console.log('inside new comment mailer');

    nodemailer.transporter.sendMail({
        from: '"Vivid 👻" <foo@example.com>',
        to: comment.user.email,
        subject: "new comment published",
        html: '<h1>your comment published</h1>'
    }, (err, info)=>{
        if(err){
            console.log('error in sending mail', err);
            return;
        }
        console.log('mail deleivered',info);
        return
    });
}