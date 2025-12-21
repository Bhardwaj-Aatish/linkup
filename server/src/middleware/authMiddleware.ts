import jwt from 'jsonwebtoken'
import { userModel } from '../models/user.js';

const authMiddleware = async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({message: 'No auth token is provided'});
    }
    try {
        const token = authHeader.split(' ')[1];
        const {id} = jwt.verify(token, process.env.JWT_SECRET as string) as any;
        const user = await userModel.findById(id)
        if(!user) {
            return res.status(401).json({message: "User don't exist"})
        }
        req.userId = id;
        next();
    } catch (e) {
        return res.status(401).json({message: 'Invalid token'});
    }

}

export default authMiddleware;