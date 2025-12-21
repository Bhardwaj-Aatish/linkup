import mongoose from "mongoose";
const {Schema} = mongoose;

const followerSchema = new Schema({
    follower: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    following: {type: Schema.Types.ObjectId, ref: 'user', required: true}
}, {timestamps: true});

followerSchema.index({follower: 1, following: 1}, {unique: true})

const followerModel = mongoose.model('follower', followerSchema);

export {followerModel};


//follower, one who is following , a follows b , 
// a is the follower 
// b is the following 