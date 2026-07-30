import SOSRequest from '../models/SOSRequest.js';
import { isDbConnected } from '../config/db.js';
import { getIO } from '../config/socket.js';

let memorySOS = [];

export const createSOS = async (req, res) => {
  try {
    const { emergencyType, latitude, longitude, address, severity, additionalNotes } = req.body;

    const lat = latitude ? parseFloat(latitude) : 12.9716;
    const lng = longitude ? parseFloat(longitude) : 77.5946;

    const sosData = {
      userId: req.user._id || req.user.id,
      userName: req.user.name,
      userPhone: req.user.phone,
      emergencyType: emergencyType || 'Medical',
      severity: severity || 'High',
      additionalNotes: additionalNotes || '',
      location: {
        type: 'Point',
        coordinates: [lng, lat],
        address: address || 'Current User Coordinates'
      },
      status: 'Pending'
    };

    let created;
    if (isDbConnected.value) {
      created = await SOSRequest.create(sosData);
    } else {
      created = {
        _id: `sos_${Date.now()}`,
        ...sosData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      memorySOS.unshift(created);
    }

    // Broadcast live alert via Socket.IO
    const io = getIO();
    if (io) {
      io.emit('new_sos_alert', created);
    }

    return res.status(201).json({
      success: true,
      message: 'SOS Alert triggered successfully! Emergency teams have been notified.',
      sos: created
    });
  } catch (error) {
    console.error('[SOS Create Error]', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getSOSRequests = async (req, res) => {
  try {
    if (isDbConnected.value) {
      const sosList = await SOSRequest.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: sosList.length, sosRequests: sosList });
    } else {
      return res.status(200).json({ success: true, count: memorySOS.length, sosRequests: memorySOS });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSOSStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedAmbulance, assignedHospital } = req.body;

    let updated;
    if (isDbConnected.value) {
      updated = await SOSRequest.findByIdAndUpdate(
        id,
        { status, assignedAmbulance, assignedHospital },
        { new: true }
      );
    } else {
      const item = memorySOS.find((s) => s._id === id);
      if (item) {
        item.status = status || item.status;
        if (assignedAmbulance) item.assignedAmbulance = assignedAmbulance;
        if (assignedHospital) item.assignedHospital = assignedHospital;
        item.updatedAt = new Date().toISOString();
        updated = item;
      }
    }

    const io = getIO();
    if (io && updated) {
      io.emit('sos_status_updated', updated);
    }

    return res.status(200).json({ success: true, message: 'SOS status updated', sos: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
