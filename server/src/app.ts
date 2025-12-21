import express from 'express'
import cors from 'cors'
import userRouter from "./routes/userRouter.js"
import postRouter from './routes/postRouter.js'
import followRouter from './routes/followRouter.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/posts/', postRouter)
app.use('/api/follow/', followRouter)


export default app;