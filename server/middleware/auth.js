import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (req, res, next) => {
  try {
    // Get token from cookie or Authorization header
    let token = req.cookies.token;
    
    // Check Authorization header if no cookie token
    const authHeader = req.headers.authorization;
    if (!token && authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'No token, authorization denied'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      console.error('Token verification error:', err);
      res.status(401).json({
        success: false,
        error: 'Token is not valid'
      });
    }
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}; 