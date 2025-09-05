import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createDoctor, getDoctors, getDoctor, updateDoctor, deleteDoctor } from '../controllers/doctorController.js';

const router = express.Router();

router.post('/', authMiddleware, createDoctor);
router.get('/', getDoctors);
router.get('/:id', getDoctor);
router.put('/:id', authMiddleware, updateDoctor);
router.delete('/:id', authMiddleware, deleteDoctor);

export default router;
