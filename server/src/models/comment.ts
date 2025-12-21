import mongoose from "mongoose";
const {Schema} = mongoose;

const commentSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    postId: {type: Schema.Types.ObjectId, ref: 'post', required: true},
    text: {type: String, required: true}
}, {timestamps: true});

const commentModel = mongoose.model('comment', commentSchema);
export {commentModel};
