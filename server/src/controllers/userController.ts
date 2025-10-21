import { userModel } from "../models/user.js";
import {z} from "zod"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";

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
    validateUser(req, res);
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


export const profile = async (req: any, res: any) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    const decoded = jwt.verify(token, JWT_SECRET);
    const userinfo = await userModel.findById((decoded as any).id)
    res.send(userinfo)
  } catch (error) {
    res.send(error)
  }
}