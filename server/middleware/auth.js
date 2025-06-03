import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies.token;
    
    if (!token) {
      throw new Error('No token provided');
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { userId: decoded.userId };
      next();
    } catch (error) {
      // If token is expired, try to use refresh token
      const refreshToken = req.cookies.refreshToken;
      
      if (!refreshToken) {
        throw new Error('Authentication failed');
      }

      try {
        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        
        // Find user and check if refresh token matches
        const user = await User.findById(decoded.userId);
        if (!user || user.refreshToken !== refreshToken) {
          throw new Error('Invalid refresh token');
        }

        // Generate new tokens
        const accessToken = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET,
          { expiresIn: '15m' }
        );

        // Set new access token cookie
        res.cookie('token', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 15 * 60 * 1000 // 15 minutes
        });

        req.user = { userId: user._id };
        next();
      } catch (refreshError) {
        throw new Error('Authentication failed');
      }
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message || 'Please authenticate'
    });
  }
};

export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}; 