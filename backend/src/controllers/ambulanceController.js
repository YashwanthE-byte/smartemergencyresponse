import Ambulance from '../models/Ambulance.js';
import { isDbConnected } from '../config/db.js';
import { getIO } from '../config/socket.js';

const mockAmbulances = [
  {
    _id: 'amb_1',
    vehicleNumber: 'AMB-101',
    driverName: 'Alex Miller',
    driverPhone: '+1 555-0194',
    status: 'Available',
    type: 'Advanced Life Support (ALS)',
    location: { type: 'Point', coordinates: [77.5925, 12.9730] }
  },
  {
    _id: 'amb_2',
    vehicleNumber: 'AMB-204',
    driverName: 'Samantha Ray',
    driverPhone: '+1 555-0188',
    status: 'Dispatched',
    type: 'Basic Life Support (BLS)',
    location: { type: 'Point', coordinates: [77.5980, 12.9690] }
  },
  {
    _id: 'amb_3',
    vehicleNumber: 'AMB-309',
    driverName: 'David Chen',
    driverPhone: '+1 555-0177',
    status: 'Available',
    type: 'Advanced Life Support (ALS)',
    location: { type: 'Point', coordinates: [77.5890, 12.9810] }
  }
];

export const getAmbulances = async (req, res) => {
  try {
    if (isDbConnected.value) {
      const list = await Ambulance.find();
      return res.status(200).json({ success: true, count: list.length, ambulances: list });
    } else {
      return res.status(200).json({ success: true, count: mockAmbulances.length, ambulances: mockAmbulances });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAmbulanceStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, latitude, longitude } = req.body;

    let updated;
    if (isDbConnected.value) {
      const updateData = {};
      if (status) updateData.status = status;
      if (latitude && longitude) {
        updateData.location = {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        };
      }

      updated = await Ambulance.findByIdAndUpdate(id, updateData, { new: true });
    } else {
      const amb = mockAmbulances.find((a) => a._id === id);
      if (amb) {
        if (status) amb.status = status;
        if (latitude && longitude) {
          amb.location.coordinates = [parseFloat(longitude), parseFloat(latitude)];
        }
        updated = amb;
      }
    }

    const io = getIO();
    if (io && updated) {
      io.emit('ambulance_location_updated', updated);
    }

    return res.status(200).json({ success: true, message: 'Ambulance status updated', ambulance: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
