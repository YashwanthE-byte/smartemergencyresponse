import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Hospital from '../models/Hospital.js';
import Ambulance from '../models/Ambulance.js';

dotenv.config();

const seedData = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI is missing in .env file');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('[Seeder] Connected to MongoDB...');

    // Clear existing collections
    await User.deleteMany({});
    await Hospital.deleteMany({});
    await Ambulance.deleteMany({});

    console.log('[Seeder] Existing records cleared.');

    // Seed Users
    const users = await User.create([
      {
        name: 'Citizen Jane Doe',
        email: 'citizen@emergency.com',
        phone: '+1 555-0192',
        password: 'demo123',
        role: 'Citizen',
        bloodGroup: 'O+',
        emergencyContacts: [{ name: 'John Doe', phone: '+1 555-0193', relation: 'Spouse' }]
      },
      {
        name: 'Driver Alex Miller',
        email: 'driver@emergency.com',
        phone: '+1 555-0194',
        password: 'demo123',
        role: 'Ambulance Driver'
      },
      {
        name: 'St. Jude Hospital Admin',
        email: 'hospital@emergency.com',
        phone: '+1 555-0195',
        password: 'demo123',
        role: 'Hospital'
      },
      {
        name: 'Central Admin',
        email: 'admin@emergency.com',
        phone: '+1 555-0196',
        password: 'demo123',
        role: 'Admin'
      }
    ]);

    console.log(`[Seeder] Seeded ${users.length} Users.`);

    // Seed Hospitals
    const hospitals = await Hospital.create([
      {
        name: 'City General Hospital & Trauma Center',
        address: '124 Healthcare Boulevard, City Center',
        phone: '+1 555-0100',
        emergencyContact: '+1 555-0101',
        totalBeds: 120,
        availableBeds: 34,
        icuBedsTotal: 25,
        icuBedsAvailable: 6,
        traumaCenterLevel: 'Level 1',
        location: { type: 'Point', coordinates: [77.5946, 12.9716] }
      },
      {
        name: 'St. Mary Emergency Care',
        address: '88 Rescue Avenue, North District',
        phone: '+1 555-0102',
        emergencyContact: '+1 555-0103',
        totalBeds: 80,
        availableBeds: 18,
        icuBedsTotal: 15,
        icuBedsAvailable: 2,
        traumaCenterLevel: 'Level 2',
        location: { type: 'Point', coordinates: [77.6012, 12.9789] }
      }
    ]);
    console.log(`[Seeder] Seeded ${hospitals.length} Hospitals.`);

    // Seed Ambulances
    const ambulances = await Ambulance.create([
      {
        vehicleNumber: 'AMB-101',
        driverId: users[1]._id,
        driverName: users[1].name,
        driverPhone: users[1].phone,
        status: 'Available',
        type: 'Advanced Life Support (ALS)',
        location: { type: 'Point', coordinates: [77.5925, 12.9730] }
      }
    ]);
    console.log(`[Seeder] Seeded ${ambulances.length} Ambulances.`);

    console.log('[Seeder] Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seeder Error]', error);
    process.exit(1);
  }
};

seedData();
