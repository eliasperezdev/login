import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.handle';

export default function validateToken(req: Request, res: Response, next: NextFunction) {
  try {
    let token = req.headers.authorization || '';
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    const payload = verifyToken(token) as { id: number };
    req.userId = payload.id;
    return next();
  } catch (error) {
    return res.status(401).json({ status: 401, message: error });
  }
}
