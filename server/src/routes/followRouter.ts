import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { followUser, unfollowUser } from '../controllers/followController.js';

const followRouter = express.Router();
followRouter.use(authMiddleware);

followRouter.post('/:following_id', followUser);
followRouter.post('/unfollow/:following_id', unfollowUser);

export default followRouter;

