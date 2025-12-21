import mongoose from "mongoose";
const {Schema} = mongoose;

const postSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: "user", required: true},
    caption: {type: String, default: ""},
    mediaUrl: [{type:String}], 
    like: [{type: Schema.Types.ObjectId, ref: 'user'}]
}, {timestamps: true});

const postModel = mongoose.model('post', postSchema);

export {postModel};