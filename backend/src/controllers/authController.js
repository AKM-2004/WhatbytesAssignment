import bcrypt from 'bcryptjs';
import validator from 'validator';
import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken, sendTokens } from '../utils/token.js';

export const register = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;
    
    // Trim whitespace
    name = (name || '').trim();
    email = (email || '').trim();
    password = (password || '').trim();

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email, password are required' });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if email already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Create user
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    // Generate tokens
    const payload = { id: user.id, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    sendTokens(res, accessToken, refreshToken);

    return res.status(201).json({ 
      message: 'User registered successfully',
      data: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    
    // Trim whitespace
    email = (email || '').trim();
    password = (password || '').trim();

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate tokens
    const payload = { id: user.id, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    sendTokens(res, accessToken, refreshToken);

    return res.json({ 
      message: 'Logged in successfully',
      data: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};
