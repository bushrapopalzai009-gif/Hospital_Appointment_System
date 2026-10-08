import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
export async function protect(req, res, next) {
  try {
    const token = req.headers.authorization?.startsWith('Bearer ') && req.headers.authorization.slice(7);
    if (!token) return res.status(401).json({ message: 'Please sign in to continue.' });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user || !user.active) return res.status(401).json({ message: 'Your account is unavailable.' });
    req.user = user; next();
  } catch { return res.status(401).json({ message: 'Your session has expired. Please sign in again.' }); }
}
export const allow = (...roles) => (req, res, next) => roles.includes(req.user.role) ? next() : res.status(403).json({ message: 'You do not have access to this resource.' });
