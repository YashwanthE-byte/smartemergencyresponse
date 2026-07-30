import EmergencyContact from '../models/EmergencyContact.js';
import { isDbConnected } from '../config/db.js';

let mockContacts = [
  { _id: 'cnt_1', userId: '66a100000000000000000001', name: 'John Doe', phone: '+1 555-0193', relation: 'Spouse', isPrimary: true },
  { _id: 'cnt_2', userId: '66a100000000000000000001', name: 'Dr. Robert Vance', phone: '+1 555-0144', relation: 'Family Doctor', isPrimary: false }
];

export const getContacts = async (req, res) => {
  try {
    const uid = req.user._id || req.user.id;
    if (isDbConnected.value) {
      const contacts = await EmergencyContact.find({ userId: uid });
      return res.status(200).json({ success: true, count: contacts.length, contacts });
    } else {
      const filtered = mockContacts.filter((c) => c.userId === uid || c.userId === '66a100000000000000000001');
      return res.status(200).json({ success: true, count: filtered.length, contacts: filtered });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addContact = async (req, res) => {
  try {
    const { name, phone, relation, isPrimary } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Contact name and phone number are required' });
    }

    const uid = req.user._id || req.user.id;

    if (isDbConnected.value) {
      const newContact = await EmergencyContact.create({
        userId: uid,
        name,
        phone,
        relation: relation || 'Family',
        isPrimary: Boolean(isPrimary)
      });
      return res.status(201).json({ success: true, message: 'Contact added', contact: newContact });
    } else {
      const newContact = {
        _id: `cnt_${Date.now()}`,
        userId: uid,
        name,
        phone,
        relation: relation || 'Family',
        isPrimary: Boolean(isPrimary)
      };
      mockContacts.push(newContact);
      return res.status(201).json({ success: true, message: 'Contact added', contact: newContact });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (isDbConnected.value) {
      await EmergencyContact.findByIdAndDelete(id);
    } else {
      mockContacts = mockContacts.filter((c) => c._id !== id);
    }
    return res.status(200).json({ success: true, message: 'Contact removed successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
