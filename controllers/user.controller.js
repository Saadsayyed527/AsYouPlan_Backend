import User from '../models/user.model.js';
import { generateAccessToken, generateRefreshToken } from '../utils/token.js';
import ApiError from '../utils/ApiError.js';
import bcrypt from 'bcryptjs';

// REGISTER
export const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ApiError(409, 'User already exists with this email');

    // ❌ Do NOT hash manually
    const newUser = await User.create({ firstName, lastName, phone, email, password });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        email: newUser.email,
        fullName: `${newUser.firstName} ${newUser.lastName}`,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("Attempting login for:", email);

    if (!email || !password) {
      throw new ApiError(400, 'Email and password are required');
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      throw new ApiError(401, 'Invalid credentials ');
    }

    console.log("User found:", user);

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      console.log("Password mismatch");
      throw new ApiError(401, 'Invalid credentials ppp');
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        email: user.email,
        fullName: `${user.firstName} ${user.lastName}`,
      },
      accessToken,
      refreshToken,
    });

  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};