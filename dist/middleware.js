"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passUserId = void 0;
const passUserId = (req, res, next) => {
    const userId = req.headers['x-user-id'];
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
exports.passUserId = passUserId;
