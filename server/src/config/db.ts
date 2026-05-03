import mongoose from "mongoose";

const dbconnect = async () => {
    try {
     if (process.env.MONGO_URI) {
        await mongoose.connect(process.env.MONGO_URI)
        
     }
      console.log("db connected finally")
    } catch {
        console.error("db not connected")
        process.exit(1)
    }
}

export default dbconnect;