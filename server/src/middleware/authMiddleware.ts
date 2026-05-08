import { userModel } from '../models/user.js';
import { verifyToken } from '../utils/jwt.js';

const authMiddleware = async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({message: 'No auth token is provided'});
    }
    try {
        if(!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({message: 'Invalid auth token format'});
        }
        const token = authHeader.split(' ')[1];
        const {userId} = verifyToken(token, "access") as any;
        
        const user = await userModel.findById(userId);

        if(!user) {
            return res.status(401).json({message: "User don't exist"})
        }
        req.userId = userId;
        next();
    } catch (e) {
        return res.status(401).json({message: 'Invalid token'});
    }

}

export default authMiddleware;