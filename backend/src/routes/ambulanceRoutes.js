import express from 'express';
import { getAmbulances, updateAmbulanceStatus } from '../controllers/ambulanceController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAmbulances);
router.put('/:id', protect, authorize('Ambulance Driver', 'Admin'), updateAmbulanceStatus);

export default router;
