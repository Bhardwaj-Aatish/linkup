import app from './app.js'
import dotenv from 'dotenv'
import dbconnect from './config/db.js'

dotenv.config()

const PORT = process.env.PORT || 3000

const startServer = async () => {
  try {
    // db connect
    await dbconnect()
    console.log("connected mongodb")
    app.listen(PORT)
  } catch {
    console.log("server not starting")
    process.exit(1)
  }
}



startServer()