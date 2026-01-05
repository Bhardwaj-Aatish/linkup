import mongoose from "mongoose";
const {Schema} = mongoose;

const postSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: "user", required: true},
    caption: {type: String, default: ""},
    mediaUrl: [{
       type: {type: String, enum: ["video", "image"], required: true},
       url: {type: String, required: true} 
    }],
    like: [{type: Schema.Types.ObjectId, ref: 'user'}]
}, {timestamps: true});

const postModel = mongoose.model('post', postSchema);

export {postModel};