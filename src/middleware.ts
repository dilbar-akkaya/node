import { Request as ExpressRequest, Response, NextFunction, RequestHandler } from "express";

interface Request extends ExpressRequest {
  userId?: string;
}
export const passUserId: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers['x-user-id'] as string;
    if (!userId) {
        return res.status(401).json({ error: 'Token not provided' });
    }
    if (userId === 'admin') {
        next();
        return;
    }
    req.userId = userId;
    next();
};