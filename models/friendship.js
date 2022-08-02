const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    // the user who sent this request
    from_user : {
        type : mongoose.Schema.Types.ObjectID,
        ref : 'User'
    },
    // the user acceted this request
    to_user: {
        type : mongoose.Schema.Types.ObjectID,
        ref : 'User'
    }
},{
    timestamps: true
});


const friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = Friendship;