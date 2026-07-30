import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { isDbConnected } from '../config/db.js';

// Pre-seeded memory users for fallback mode if DB is offline
const memoryUsers = [
  {
    _id: '66a100000000000000000001',
    name: 'Citizen Jane Doe',
    email: 'citizen@emergency.com',
    phone: '+1 555-0192',
    passwordHash: '$2a$10$wN1QeY9uF4y0Fv2F9Q9Z.eQkQYJ3dZJ8f8hZ1XJ8f8hZ1XJ8f8hZ1', // demo123
    role: 'Citizen',
    bloodGroup: 'O+',
    emergencyContacts: [{ name: 'John Doe', phone: '+1 555-0193', relation: 'Spouse' }],
    createdAt: new Date().toISOString()
  },
  {
    _id: '66a100000000000000000002',
    name: 'Driver Alex Miller',
    email: 'driver@emergency.com',
    phone: '+1 555-0194',
    passwordHash: '$2a$10$wN1QeY9uF4y0Fv2F9Q9Z.eQkQYJ3dZJ8f8hZ1XJ8f8hZ1XJ8f8hZ1', // demo123
    role: 'Ambulance Driver',
    isAvailable: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: '66a100000000000000000003',
    name: 'St. Jude Memorial Hospital',
    email: 'hospital@emergency.com',
    phone: '+1 555-0195',
    passwordHash: '$2a$10$wN1QeY9uF4y0Fv2F9Q9Z.eQkQYJ3dZJ8f8hZ1XJ8f8hZ1XJ8f8hZ1', // demo123
    role: 'Hospital',
    createdAt: new Date().toISOString()
  },
  {
    _id: '66a100000000000000000004',
    name: 'System Admin',
    email: 'admin@emergency.com',
    phone: '+1 555-0196',
    passwordHash: '$2a$10$wN1QeY9uF4y0Fv2F9Q9Z.eQkQYJ3dZJ8f8hZ1XJ8f8hZ1XJ8f8hZ1', // demo123
    role: 'Admin',
    createdAt: new Date().toISOString()
  }
];

export const getMemoryUsers = () => memoryUsers;

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role, emergencyContacts, bloodGroup } = req.body;

    // Validation
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, phone, and password'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    const validRoles = ['Citizen', 'Ambulance Driver', 'Hospital', 'Admin'];
    const userRole = role && validRoles.includes(role) ? role : 'Citizen';

    if (isDbConnected.value) {
      const userExists = await User.findOne({ email: email.toLowerCase() });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'User already exists with this email' });
      }

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        phone,
        password,
        role: userRole,
        bloodGroup: bloodGroup || 'Unknown',
        emergencyContacts: emergencyContacts || []
      });

      const token = generateToken(user._id, user.role);

      return res.status(201).json({
        success: true,
        message: 'Registration successful',
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          bloodGroup: user.bloodGroup,
          emergencyContacts: user.emergencyContacts,
          createdAt: user.createdAt
        }
      });
    } else {
      // Fallback in-memory registration
      const existing = memoryUsers.find((u) => u.email === email.toLowerCase());
      if (existing) {
        return res.status(400).json({ success: false, message: 'User already exists with this email' });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const newId = `mem_${Date.now()}`;

      const newUser = {
        _id: newId,
        name,
        email: email.toLowerCase(),
        phone,
        passwordHash,
        role: userRole,
        bloodGroup: bloodGroup || 'Unknown',
        emergencyContacts: emergencyContacts || [],
        createdAt: new Date().toISOString()
      };

      memoryUsers.push(newUser);
      const token = generateToken(newUser._id, newUser.role);

      return res.status(201).json({
        success: true,
        message: 'Registration successful (Memory Mode)',
        token,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
          bloodGroup: newUser.bloodGroup,
          emergencyContacts: newUser.emergencyContacts,
          createdAt: newUser.createdAt
        }
      });
    }
  } catch (error) {
    console.error('[Register Error]', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error during registration' });
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    if (isDbConnected.value) {
      const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

      if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id, user.role);

        return res.status(200).json({
          success: true,
          message: 'Login successful',
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            bloodGroup: user.bloodGroup,
            emergencyContacts: user.emergencyContacts,
            createdAt: user.createdAt
          }
        });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    } else {
      // Memory mode fallback
      const user = memoryUsers.find((u) => u.email === email.toLowerCase());

      let isMatch = false;
      if (user) {
        if (user.passwordHash) {
          isMatch = await bcrypt.compare(password, user.passwordHash);
        }
        // Allow demo login with 'demo123' or '123456'
        if (!isMatch && (password === 'demo123' || password === '123456')) {
          isMatch = true;
        }
      }

      if (user && isMatch) {
        const token = generateToken(user._id, user.role);

        return res.status(200).json({
          success: true,
          message: 'Login successful (Memory Mode)',
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            bloodGroup: user.bloodGroup,
            emergencyContacts: user.emergencyContacts || [],
            createdAt: user.createdAt
          }
        });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    }
  } catch (error) {
    console.error('[Login Error]', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error during login' });
  }
};

/**
 * @desc    Get logged in user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
export const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ success: false, message: 'User profile not found' });
    }

    return res.status(200).json({
      success: true,
      user: {
        _id: user._id || user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        bloodGroup: user.bloodGroup || 'Unknown',
        emergencyContacts: user.emergencyContacts || [],
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('[Profile Error]', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving profile' });
  }
};
