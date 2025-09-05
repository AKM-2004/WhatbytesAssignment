import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET ;
const ACCESS_TOKEN_EXPIRES_IN = '1d';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

export function generateAccessToken(payload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
}

export function generateRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
}

export function sendTokens(res, accessToken, refreshToken) {
  // Secure cookie options
  const commonOptions = {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  };
  res.cookie('accessToken', accessToken, { ...commonOptions, maxAge: 15 * 60 * 1000 });
  res.cookie('refreshToken', refreshToken, { ...commonOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
}
