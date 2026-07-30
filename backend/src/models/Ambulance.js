import mongoose from 'mongoose';

const ambulanceSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    driverName: {
      type: String,
      required: true
    },
    driverPhone: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['Available', 'Dispatched', 'Busy', 'Offline'],
      default: 'Available'
    },
    type: {
      type: String,
      enum: ['Basic Life Support (BLS)', 'Advanced Life Support (ALS)', 'Patient Transport'],
      default: 'Advanced Life Support (ALS)'
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true
      }
    },
    currentSOS: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SOSRequest'
    }
  },
  {
    timestamps: true
  }
);

ambulanceSchema.index({ location: '2dsphere' });

const Ambulance = mongoose.models.Ambulance || mongoose.model('Ambulance', ambulanceSchema);
export default Ambulance;
