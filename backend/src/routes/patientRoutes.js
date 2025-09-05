import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createPatient, getPatients, getPatient, updatePatient, deletePatient } from '../controllers/patientController.js';

const router = express.Router();

router.post('/', authMiddleware, createPatient);
router.get('/', authMiddleware, getPatients); // this will give you list of patents 
router.get('/:id', authMiddleware, getPatient); // only that perticular patent data
router.put('/:id', authMiddleware, updatePatient);
router.delete('/:id', authMiddleware, deletePatient);

export default router;
