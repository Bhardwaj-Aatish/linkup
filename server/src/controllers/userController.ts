import { userModel } from "../models/user.js";
import {z} from "zod"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import { postModel } from "../models/post.js";

const JWT_SECRET='myappsecret'

const validateUser = (req: any, res: any) => {
  const user = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().max(20), //todo add regex to validate passwords to include speical char, A-Z, a-z, 0-9
  })

  const validationRes = user.safeParse(req.body)
  
  if(!validationRes.success) {
    const errorJson = JSON.parse(validationRes.error.message)
    res.status(400).json({message: "Invalid data", err: errorJson})
    return false
  }   
  return true;
}

export const signup = async (req: any ,res: any) => {
    try {
      const isValidData = validateUser(req, res)
      if(!isValidData) return;
      const {name, email, password} = req.body;
      const hashpassword = await bcrypt.hash(password, 5);
      const response = await userModel.create({name,email, password: hashpassword});
      res.status(201).json({message: 'user is successfully signup', userData: response})

    } catch (error) {
      if((error as any).code === 11000) {
        res.status(400).send('Email already exist')
        return;
      }
       res.status(500).send('Server error')
    }
}


export const signin = async (req: any, res: any) => {
  try {
    const isValidData = validateUser(req, res);
    if(!isValidData) return;
    const {name, email, password} = req.body;
    const user = await userModel.findOne({email}) as any;
    const isValidPassword = await bcrypt.compare(password, user.password)
    if(!isValidPassword) {
      res.status(402).json({message: "Invalid password"})
    }
    const token = jwt.sign({id: user._id}, JWT_SECRET)
    res.status(201).json({message: "Signin successfully", user, token})
  } catch {
    console.error("error while signing in")
    res.send("error while signin")
  }
}


// fetch the comments in the post too in future.
export const getSelfProfle = async (req: any, res: any) => {
  try {
    const userInfo = await userModel.findById(req.userId).select('-password').lean();
    const allUserPosts = await postModel.find({author: req.userId}).sort({createdAt: -1}).lean();
    const likedPosts = await postModel.find({like: req.userId}).sort({createdAt: -1}).lean();
    const mediaUrls = allUserPosts.flatMap(post => post.mediaUrl);
    const response = {userInfo, allUserPosts, likedPosts, mediaUrls};
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({message: 'Server error', errorMessage: error});
  }
}


export const modifySelfProfile = async (req: any, res: any) => {
  try {
    const userInfo  = await userModel.findOneAndUpdate({_id: req.userId}, req.body, {new: true})
    res.status(201).json({userInfo: userInfo})
  } catch (error) {
    console.error("Error while modify the profile code")
    res.send(error)
  }
}

// 


export const fetchAllUser = async (req: any, res: any) => {
  try {
    const allUser = await userModel.find().select('name email profilePhoto').lean();
    res.status(200).json(allUser)
  } catch (error) {
    res.status(500).json({message: 'Error while fetching user data'}, error)
  }
}
 

