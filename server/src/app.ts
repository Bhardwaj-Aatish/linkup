import express from 'express'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from "./routes/userRouter.js"
import postRouter from './routes/postRouter.js'
import followRouter from './routes/followRouter.js'

const app = express()

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/posts/', postRouter)
app.use('/api/follow/', followRouter)


export default app;