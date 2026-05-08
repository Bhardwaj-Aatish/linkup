import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_SECRET as string;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export function signAccessToken(payload: object) {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' });
}

export function signRefreshToken(payload: object) {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string, type: 'access' | 'refresh') {
    const secret = type === 'access' ? ACCESS_SECRET : REFRESH_SECRET;
    return jwt.verify(token, secret);
}