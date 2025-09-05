import { verifyAccessToken, generateAccessToken, verifyRefreshToken, sendTokens } from '../utils/token.js';
import User from '../models/User.js';

export default async function authMiddleware(req, res, next) {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    try {
      const decoded = verifyAccessToken(accessToken);
      req.user = decoded;
      return next();
    } catch (err) {
      // access token invalid or expired, try refresh
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({ message: 'Not authenticated' });
      }
      try {
        const decodedRefresh = verifyRefreshToken(refreshToken);
        const user = await User.findByPk(decodedRefresh.id);
        if (!user) throw new Error('User not found');
        const newAccessToken = generateAccessToken({ id: user.id, email: user.email });
        sendTokens(res, newAccessToken, refreshToken); // reuse refresh
        req.user = { id: user.id, email: user.email };
        return next();
      } catch (err2) {
        return res.status(401).json({ message: 'Session expired' });
      }
    }
  } catch (error) {
    next(error);
  }
}
