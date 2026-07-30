import Hospital from '../models/Hospital.js';
import { isDbConnected } from '../config/db.js';

const mockHospitals = [
  {
    _id: 'hosp_1',
    name: 'City General Hospital & Trauma Center',
    address: '124 Healthcare Boulevard, City Center',
    phone: '+1 555-0100',
    emergencyContact: '+1 555-0101',
    totalBeds: 120,
    availableBeds: 34,
    icuBedsTotal: 25,
    icuBedsAvailable: 6,
    traumaCenterLevel: 'Level 1',
    isOperational: true,
    location: { type: 'Point', coordinates: [77.5946, 12.9716] }
  },
  {
    _id: 'hosp_2',
    name: 'St. Mary Emergency Care',
    address: '88 Rescue Avenue, North District',
    phone: '+1 555-0102',
    emergencyContact: '+1 555-0103',
    totalBeds: 80,
    availableBeds: 18,
    icuBedsTotal: 15,
    icuBedsAvailable: 2,
    traumaCenterLevel: 'Level 2',
    isOperational: true,
    location: { type: 'Point', coordinates: [77.6012, 12.9789] }
  },
  {
    _id: 'hosp_3',
    name: 'Apex Super Speciality Hospital',
    address: '500 Life Science Road, East Sector',
    phone: '+1 555-0104',
    emergencyContact: '+1 555-0105',
    totalBeds: 200,
    availableBeds: 62,
    icuBedsTotal: 40,
    icuBedsAvailable: 11,
    traumaCenterLevel: 'Level 1',
    isOperational: true,
    location: { type: 'Point', coordinates: [77.5855, 12.9654] }
  }
];

export const getHospitals = async (req, res) => {
  try {
    if (isDbConnected.value) {
      const hospitals = await Hospital.find();
      return res.status(200).json({ success: true, count: hospitals.length, hospitals });
    } else {
      return res.status(200).json({ success: true, count: mockHospitals.length, hospitals: mockHospitals });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBeds = async (req, res) => {
  try {
    const { id } = req.params;
    const { availableBeds, icuBedsAvailable } = req.body;

    let updated;
    if (isDbConnected.value) {
      updated = await Hospital.findByIdAndUpdate(
        id,
        { availableBeds, icuBedsAvailable },
        { new: true }
      );
    } else {
      const hosp = mockHospitals.find((h) => h._id === id);
      if (hosp) {
        if (availableBeds !== undefined) hosp.availableBeds = availableBeds;
        if (icuBedsAvailable !== undefined) hosp.icuBedsAvailable = icuBedsAvailable;
        updated = hosp;
      }
    }

    return res.status(200).json({ success: true, message: 'Hospital bed status updated', hospital: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
