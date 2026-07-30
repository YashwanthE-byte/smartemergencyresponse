import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    emergencyContact: {
      type: String,
      required: true
    },
    totalBeds: {
      type: Number,
      default: 50
    },
    availableBeds: {
      type: Number,
      default: 20
    },
    icuBedsTotal: {
      type: Number,
      default: 10
    },
    icuBedsAvailable: {
      type: Number,
      default: 3
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
    traumaCenterLevel: {
      type: String,
      default: 'Level 1'
    },
    isOperational: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

hospitalSchema.index({ location: '2dsphere' });

const Hospital = mongoose.models.Hospital || mongoose.model('Hospital', hospitalSchema);
export default Hospital;
