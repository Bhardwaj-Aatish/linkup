import { commentModel } from "../models/comment.js";
import { postModel } from "../models/post.js"
import uploadOnCloudinary from "../utils/cloudinary.js";

export const createPost = async (req: any, res: any) => {
    try {
        const {caption} = req.body || {};
        const media = req.files || [];
        
        let mediaUrl: any = [];

        for(const file of media) {
            const result = await uploadOnCloudinary(file.path);
            if(result) {
                mediaUrl.push({
                    type: file.mimetype.startsWith("video") ? "video" : "image",
                    url: result.secure_url
                })
            }
        }

        // make sure either of caption or media is present, otherwise someone can create post
        if(!caption && mediaUrl.length === 0) {
            return res.status(400).json({message: "Can't create empty post"});
        }

        const response = await postModel.create({author: req.userId, caption, mediaUrl, like: []});
        const postWithAuthor = await postModel.findById(response._id).populate("author", "name email profilePhoto");
        const post = {
            ...postWithAuthor?.toObject(),
            comments: []
        }
        res.status(201).json({message: 'Successfully created the post', post});
    } catch (error) {
        res.status(500).json({message: 'Server error', errorMessage: error});
    }
}

export const getPosts = async (req: any, res: any) => {
    try {
        const posts = await postModel.find().sort({createdAt: -1}).populate('author', 'name email profilePhoto');
        const response = [];
        for (const post of posts) {
            const comments = await commentModel.find({postId: post._id}).sort({createdAt: -1}).populate('author', 'name email profilePhoto');
            const currentPost = post.toObject();
            response.push({comments, ...currentPost});
        }
        res.status(200).json({posts: response});
    } catch (error) {
        res.status(500).json({message: 'Error while fetching posts with comments', errorMessage: error});
    }
}

export const getPostsUsingLookup = async (req: any, res: any) => {
    try {
        const posts = await postModel.aggregate([
            // sort the post by newest first
            {$sort: {createdAt : -1}},

            // populate author 
            {
                $lookup: {
                    from: 'users', // user collection name
                    localField: 'author', // postModel author ref
                    foreignField: '_id',
                    as : 'author'
                }
            },

            {$unwind: '$author'}, // convert the author array to object in the response, without it, it will be an array of object with only 1 item

            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postId',
                    as : 'comments'
                }
            },

            {
                $addFields: {
                    comments: {
                        $sortArray: {
                            input: '$comments',
                            sortBy: {createdAt: -1}
                        }
                    }
                }
            },

            {
                $project: {
                    author: {
                        name: 1,
                        email: 1,
                        profilePhoto: 1
                    },
                    comments: 1,
                    caption: 1,
                    mediaUrl: 1,
                    like: 1,
                    createdAt: 1,
                    updatedAt: 1

                }
            }
        ])
        res.status(200).json({posts: posts});
    } catch (error) {
        res.status(500).json({message: 'Error while fetching posts with comments', errorMessage: error})
    }
}

export const likePost = async (req: any, res: any) => {
    try {
        const postId = req.params.post_id;
        const userId = req.userId;
        const post = await postModel.findByIdAndUpdate(
            postId,
            {$addToSet: {like: userId}},
            {new: true}
        )
        if(!post) {
            return res.status(404).json({message: 'Post not found'});
        }
        res.status(201).json({post})
    } catch (error) {
        res.status(500).json({message: 'Server error', errorMessage: error})
    }
}

export const unlikePost = async (req: any, res: any) => {
    try {
        const postId = req.params.post_id;
        const userId = req.userId;
        const post = await postModel.findByIdAndUpdate(
            postId,
            {$pull: {like: userId}},
            {new: true}
        )
        if (!post) {
            return res.status(404).json({message: 'Post not found'});
        }
        res.status(201).json({post})
    } catch (error) {
        res.status(500).json({message: 'Server error', errorMessage: error})
    }
}


export const deletePost = async (req: any, res: any) => {
    try {
        const postId = req.params.post_id;
        const response = await postModel.findByIdAndDelete(postId);

        //check if post is deleted by author of the post, if not, then don't delete the post and return error
        // to do 
        // not doing now for ease of testing, but we will do it for sure before the production release, as it is a critical bug
        // if(response?.author.toString() !== req.userId) {
        //     return res.status(403).json({message: 'You are not authorized to delete this post'})
        // }

        if(!response) {
            return res.status(404).json({message: 'Post not found'})
        }
        await commentModel.deleteMany({postId:postId})
        res.status(204).send();
        //to do -> use session, so that, if comment fails, we don't delete the post too
        //  const session = await mongoose.startSession();

    } catch (error) {
        res.status(500).json({message: 'Server error', errorMessage: error})
    }
}

export const createComment = async (req: any, res: any) => {
    try {
        const postId = req.params.post_id;
        const author = req.userId;
        const text = req.body.text;

        const post = await postModel.findById(postId)

        if (!post) {
            return res.status(404).json({message: 'Post not found'})
        }

        if((!text) || (text.trim().length === 0)) {
            return res.status(400).json({message: 'No comment text is provided'})
        }
        const comment = await commentModel.create({author, text, postId});
        const populatedComment = await comment.populate('author', '_id name email profilePhoto');
        res.status(201).json({comment: populatedComment});
    } catch (error) {
      res.status(500).json({message: 'Server error', errorMessage: error})        
    }
}

export const deleteComment = async (req: any, res: any) => {
    try {
        const commentId = req.params.comment_id;
        const postId = req.params.post_id;
        const response = await commentModel.findByIdAndDelete(commentId);

        //to do -> check if the comment is deleted by the author of the comment, if not, then don't delete the comment and return error
        // not doing now for ease of testing, but we will do it for sure before the production release, as it is a critical bug
        // if(comment?.author.toString() !== req.userId) {
        //     return res.status(403).json({message: 'You are not authorized to delete this comment'})
        // }

        if(!response) {
            return res.status(404).json({message: 'Comment not found'})
        }
        const message = {
            "success": "true",
            "commentId": commentId,
            "postId": postId,
        }
        res.status(200).send(message);
    } catch (error) {
        res.status(500).json({message: 'Server', errorMessage: error})
    }
}


export const getComment = async (req: any, res: any) => {
    try {
        const comments = await commentModel.find().sort({createdAt: -1}).populate('author', 'name email profilePhoto')
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({message: 'Server', errorMessage: error})
    }
}