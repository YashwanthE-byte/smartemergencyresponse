import Notification from '../models/Notification.js';
import { isDbConnected } from '../config/db.js';

let mockNotifications = [
  {
    _id: 'notif_1',
    title: 'Emergency Response Activated',
    message: 'Ambulance AMB-101 has been dispatched to your location.',
    type: 'SOS',
    read: false,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'notif_2',
    title: 'Hospital Bed Reserved',
    message: 'St. Jude Memorial Hospital has pre-assigned ICU Bed #4.',
    type: 'Bed_Alert',
    read: true,
    createdAt: new Date().toISOString()
  }
];

export const getNotifications = async (req, res) => {
  try {
    if (isDbConnected.value) {
      const list = await Notification.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, notifications: list });
    } else {
      return res.status(200).json({ success: true, notifications: mockNotifications });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const markRead = async (req, res) => {
  try {
    const { id } = req.params;
    if (isDbConnected.value) {
      await Notification.findByIdAndUpdate(id, { read: true });
    } else {
      const n = mockNotifications.find((item) => item._id === id);
      if (n) n.read = true;
    }
    return res.status(200).json({ success: true, message: 'Notification marked as read' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
