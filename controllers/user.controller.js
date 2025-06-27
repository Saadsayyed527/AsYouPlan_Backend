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

    // Do NOT hash manually
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

// Login User
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

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: err.message,
    });
  }
};

// get user by id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update user
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete user

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};