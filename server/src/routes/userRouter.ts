import express from 'express'
import { getSelfProfle, signin, signup, modifySelfProfile, fetchAllUser } from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/signup', signup)
userRouter.post('/signin', signin)

userRouter.use(authMiddleware);

userRouter.get('/all_user', fetchAllUser)

userRouter.get('/me', getSelfProfle) // get the user comments, liked comments, with the media url 
userRouter.patch('/me', modifySelfProfile) // modify only the userinfo

export default userRouter;