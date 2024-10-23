// jwt.js
import jwt from 'jsonwebtoken';

const secretKey = 'oscar_printing_v1';

// Function to generate a JWT token
export const generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

export const verifyToken = (token) => {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  };
