import { commentModel } from "../models/comment.js";
import { postModel } from "../models/post.js"

export const createPost = async (req: any, res: any) => {
    try {
        const {caption, mediaUrl} = req.body || {};
        // make sure either of caption or media is present, otherwise someone can create post
        if(!caption && !mediaUrl) {
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
            const comments = await commentModel.find({postId: post._id}).sort({createdAt: -1});
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

        if(!response) {
            return res.status(404).json({message: 'Post not found'})
        }
        await commentModel.deleteMany({id:postId})
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
        res.status(201).json({comment})
    } catch (error) {
      res.status(500).json({message: 'Server error', errorMessage: error})        
    }
}

export const deleteComment = async (req: any, res: any) => {
    try {
        const commentId = req.params.comment_id;
        const response = commentModel.findByIdAndDelete(commentId);

        if(!response) {
            return res.status(404).json({message: 'Comment not found'})
        }
        res.status(204).send()
    } catch (error) {
        res.status(500).json({message: 'Server', errorMessage: error})
    }
}


export const getComment = async (req: any, res: any) => {
    try {
        const comments = await commentModel.find().sort({createdAt: -1})
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({message: 'Server', errorMessage: error})
    }
}