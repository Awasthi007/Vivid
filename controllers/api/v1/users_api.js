const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


module.exports.createSession = async function(req, res){

    try {
        let user = await User.findOne({email : req.body.email});
        if(!user || user.password != req.body.password){
            return res.json(422, {
                message : "invalid username/password"
            });

        }else{
            return res.json(200, {
                message : "sign in succesful, token generated",
                data: {
                    token: jwt.sign(user.toJSON(), 'shashankvivid', {expiresIn: '100000'})
                }
            });
        }

        }catch(err){
            console.log("error in users_api", err);
            return res.json(500, {
                message: "internal server error"
            });
        }

    
}