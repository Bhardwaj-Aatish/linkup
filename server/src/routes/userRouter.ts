import express from 'express'
import { profile, signin, signup } from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post('/signup', signup)
userRouter.post('/signin', signin)
userRouter.get('/me', profile)

export default userRouter;