import User from '../models/User.js';
import { isDbConnected } from '../config/db.js';
import { getMemoryUsers } from './authController.js';

export const getUsers = async (req, res) => {
  try {
    if (isDbConnected.value) {
      const users = await User.find().select('-password');
      return res.status(200).json({ success: true, count: users.length, users });
    } else {
      const memoryUsers = getMemoryUsers();
      const safeUsers = memoryUsers.map(({ passwordHash, ...u }) => u);
      return res.status(200).json({ success: true, count: safeUsers.length, users: safeUsers });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, phone, bloodGroup, medicalNotes } = req.body;
    if (isDbConnected.value) {
      const user = await User.findById(req.user._id);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });

      if (name) user.name = name;
      if (phone) user.phone = phone;
      if (bloodGroup) user.bloodGroup = bloodGroup;
      if (medicalNotes !== undefined) user.medicalNotes = medicalNotes;

      await user.save();
      return res.status(200).json({ success: true, message: 'Profile updated', user });
    } else {
      const memoryUsers = getMemoryUsers();
      const user = memoryUsers.find((u) => u._id === req.user._id);
      if (user) {
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (bloodGroup) user.bloodGroup = bloodGroup;
        if (medicalNotes !== undefined) user.medicalNotes = medicalNotes;
      }
      return res.status(200).json({ success: true, message: 'Profile updated', user });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
