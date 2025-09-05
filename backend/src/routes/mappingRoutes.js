import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createMapping, getMappings, getMappingsByPatient, deleteMapping } from '../controllers/mappingController.js';

const router = express.Router();

router.post('/', authMiddleware, createMapping);
router.get('/', authMiddleware, getMappings);
router.get('/:patientId', authMiddleware, getMappingsByPatient);
router.delete('/:id', authMiddleware, deleteMapping);

export default router;
