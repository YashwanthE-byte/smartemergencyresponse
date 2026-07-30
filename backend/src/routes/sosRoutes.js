import express from 'express';
import { createSOS, getSOSRequests, updateSOSStatus } from '../controllers/sosController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createSOS);
router.get('/', protect, getSOSRequests);
router.put('/:id', protect, authorize('Admin', 'Ambulance Driver', 'Hospital'), updateSOSStatus);

export default router;
