import { userModel } from "../models/user.js";
import { z } from "zod"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import crypto from "crypto";
import { postModel } from "../models/post.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { signAccessToken, signRefreshToken, verifyToken } from "../utils/jwt.js";
import { refreshTokenModel } from "../models/token.js";
import { ref } from "process";



const validateUser = (req: any, res: any) => {
  const user = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().max(20), //todo add regex to validate passwords to include speical char, A-Z, a-z, 0-9
  })

  const validationRes = user.safeParse(req.body)

  if (!validationRes.success) {
    const errorJson = JSON.parse(validationRes.error.message)
    res.status(400).json({ message: "Invalid data", err: errorJson })
    return false
  }
  return true;
}

export const signup = async (req: any, res: any) => {
  try {
    const isValidData = validateUser(req, res)
    if (!isValidData) return;
    const { name, email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 5);
    const response = await userModel.create({ name, email, password: hashpassword });
    res.status(201).json({ message: 'user is successfully signup', userData: response })

  } catch (error) {
    if ((error as any).code === 11000) {
      res.status(400).send('Email already exist')
      return;
    }
    res.status(500).send('Server error')
  }
}


export const signin = async (req: any, res: any) => {
  try {
    const isValidData = validateUser(req, res);
    if (!isValidData) return;
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email }) as any;

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(402).json({ message: "Invalid password" })
    }

    const accessToken = signAccessToken({ userId: user._id });

    const jti = crypto.randomUUID();
    const refreshToken = signRefreshToken({ userId: user._id, jti });

    const tokenHash = await bcrypt.hash(refreshToken, 5);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await refreshTokenModel.create({ userId: user._id, tokenHash, jti, expiresAt });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    res.status(201).json({ message: "User signed in successfully", token: accessToken })

  } catch {
    console.error("error while signing in")
    res.send("error while signin")
  }
}


// fetch the comments in the post too in future.
export const getSelfProfle = async (req: any, res: any) => {
  try {
    const userInfo = await userModel.findById(req.userId).select('-password').lean();
    const allUserPosts = await postModel.find({ author: req.userId }).sort({ createdAt: -1 }).lean();
    const likedPosts = await postModel.find({ like: req.userId }).sort({ createdAt: -1 }).lean();
    const mediaUrls = allUserPosts.flatMap(post => post.mediaUrl);
    const response = { userInfo, allUserPosts, likedPosts, mediaUrls };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Server error', errorMessage: error });
  }
}


export const modifySelfProfile = async (req: any, res: any) => {
  try {
    let fileData = {};
    if (req.files && req.files['profilePhoto'] && req.files['profilePhoto'][0]) {
      const pRes = await uploadOnCloudinary(req.files['profilePhoto'][0].path);
      fileData = {
        ...fileData,
        profilePhoto: pRes?.secure_url
      }
    }

    if (req.files && req.files['coverPhoto'] && req.files['coverPhoto'][0]) {
      const cRes = await uploadOnCloudinary(req.files['coverPhoto'][0].path);
      fileData = {
        ...fileData,
        coverPhoto: cRes?.secure_url
      }
    }
    const userInfo = await userModel.findOneAndUpdate({ _id: req.userId }, { ...req.body, ...fileData }, { new: true })
    res.status(201).json({ userInfo: userInfo })
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
    res.status(500).json({ message: 'Error while fetching user data' }, error)
  }
}



export const refresh = async (req: any, res: any) => {
  const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  try {
    const token = verifyToken(refreshToken, "refresh") as any;
    console.log("token verifying", token);
    const storedToken = await refreshTokenModel.findOne({ jti: token.jti });

    if (!storedToken) {
      return res.status(401).json({ message: 'Invalid refresh token' })
    }

    const isTokenValid = await bcrypt.compare(refreshToken, storedToken.tokenHash);
    if (!isTokenValid) {
      return res.status(401).json({ message: 'Invalid refresh token' })
    }

    const newJti = crypto.randomUUID()
    const newAccessToken = signAccessToken({ userId: token.userId });
    const newRefreshToken = signRefreshToken({ userId: token.userId, jti: newJti });

    const newTokenHash = await bcrypt.hash(newRefreshToken, 5);
    const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await refreshTokenModel.deleteOne({ jti: token.jti });
    await refreshTokenModel.create({ userId: token.userId, tokenHash: newTokenHash, jti: newJti, expiresAt: newExpiresAt });

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: 'Token fetched successfully', accessToken: newAccessToken });

  } catch {
    res.status(401).json({ message: 'Error while refreshing token' })
  }
}


export const logout = async (req: any, res: any) => {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;
    if (refreshToken) {
      const token = verifyToken(refreshToken, "refresh") as any;
      const storedToken = await refreshTokenModel.findOne({ jti: token.jti });

      if (storedToken) {
        const isTokenValid = await bcrypt.compare(refreshToken, storedToken.tokenHash);
        if (isTokenValid) {
          await refreshTokenModel.deleteOne({ jti: token.jti });
        }
      }
    }
  } catch (error) {
    console.error("Error while logout", error);
  }

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  })
  res.status(200).json({ message: 'Logged out successfully' })
}

