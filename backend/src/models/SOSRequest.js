import mongoose from 'mongoose';

const sosRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    userPhone: {
      type: String,
      required: true
    },
    emergencyType: {
      type: String,
      enum: ['Medical', 'Accident', 'Fire', 'Cardiac', 'Pregnancy', 'General'],
      default: 'Medical'
    },
    status: {
      type: String,
      enum: ['Pending', 'Dispatched', 'En Route', 'Resolved', 'Cancelled'],
      default: 'Pending'
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
      },
      address: {
        type: String,
        default: 'Unknown location'
      }
    },
    assignedAmbulance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ambulance'
    },
    assignedHospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital'
    },
    severity: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'High'
    },
    additionalNotes: String
  },
  {
    timestamps: true
  }
);

sosRequestSchema.index({ location: '2dsphere' });

const SOSRequest = mongoose.models.SOSRequest || mongoose.model('SOSRequest', sosRequestSchema);
export default SOSRequest;
