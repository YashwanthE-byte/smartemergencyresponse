import express from 'express';
import { getUsers, updateUserProfile } from '../controllers/userController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, authorize('Admin'), getUsers);
router.put('/profile', protect, updateUserProfile);

export default router;
