import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createPost, getPostsUsingLookup, likePost, unlikePost, deleteComment, createComment, deletePost, getComment, getPosts } from '../controllers/postController.js';

const postRouter = express.Router();

postRouter.use(authMiddleware);

//posts
postRouter.post('/create', createPost);
postRouter.get('/all', getPosts); // along with the comments
postRouter.delete('/delete_post/:post_id', deletePost); // will not provide the option in the mvp

//like and unlike post
postRouter.patch('/like_post/:post_id', likePost);
postRouter.patch('/unlike_post/:post_id', unlikePost);

//comments
postRouter.post('/comment/:post_id', createComment);
postRouter.delete('/delete_comment/:post_id/:comment_id', deleteComment); // will not provide the optio in the mvp
postRouter.get('/comment/', getComment); // no use in application

export default postRouter