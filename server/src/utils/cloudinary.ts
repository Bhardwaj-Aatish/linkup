import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config() // dotenv is required here, not working without it. 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME as string,
  api_key: process.env.CLOUDINARY_KEY as string,
  api_secret: process.env.CLOUDINARY_SECRET as string,
});

const uploadOnCloudinary = async (localFilePath: any) => {
    try {
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        return response;
    } catch (error) {
        console.error("Error occured while uploading", error);        
    } finally {
        fs.unlinkSync(localFilePath);
    }
}




export default uploadOnCloudinary;