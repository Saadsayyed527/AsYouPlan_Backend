// middleware/auth.middleware.js
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  //just checking header starts with Ok
  if (!authHeader || !authHeader.startsWith('Ok ')) {
    return res.status(401).json({ success: false, message: 'No token provided or invalid format (expected "Ok <token>")' });
  }
  //extracting the tocken
  const token = authHeader.split(' ')[1]; 
  try {
    //then decoding the tocken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId || decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token', error: error.message });
  }
};