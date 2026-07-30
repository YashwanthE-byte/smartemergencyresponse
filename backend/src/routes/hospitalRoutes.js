import express from 'express';
import { getHospitals, updateBeds } from '../controllers/hospitalController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getHospitals);
router.put('/:id/beds', protect, authorize('Hospital', 'Admin'), updateBeds);

export default router;
