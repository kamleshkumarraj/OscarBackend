import User from '../models/userModel.js';

import { generateToken } from '../services/tokenService.js';

export const signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user
    const user = new User({ email, password });
    
    await user.save();
    const token = generateToken({ userId: user._id ,email });
    res.status(201).json({ message: 'User registered successfully',token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = generateToken({ userId: user._id ,email });

    res.status(200).json({ message: 'Login successful',token , data : user  });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
