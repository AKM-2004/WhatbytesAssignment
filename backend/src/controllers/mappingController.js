import PatientDoctorMapping from '../models/PatientDoctorMapping.js';
import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';

export const createMapping = async (req, res, next) => {
  try {
    const { patientId, doctorId } = req.body;
    // Optionally validate ownership of patient by user
    const patient = await Patient.findOne({ where: { id: patientId, userId: req.user.id } });
    if (!patient) return res.status(404).json({ message: 'Patient not found or unauthorized' });
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    const mapping = await PatientDoctorMapping.create({ patientId, doctorId });
    res.status(201).json({
      message: 'Patient-doctor mapping created successfully',
      data: mapping
    });
  } catch (err) {
    next(err);
  }
};

export const getMappings = async (req, res, next) => {
  try {
    const mappings = await PatientDoctorMapping.findAll({ 
      include: [
        { model: Patient, as: 'patient' },
        { model: Doctor, as: 'doctor' }
      ]
    });
    res.json({
      message: 'Mappings retrieved successfully',
      data: mappings
    });
  } catch (err) {
    next(err);
  }
};

export const getMappingsByPatient = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const mappings = await PatientDoctorMapping.findAll({ 
      where: { patientId }, 
      include: [{ model: Doctor, as: 'doctor' }]
    });
    res.json({
      message: 'Patient mappings retrieved successfully',
      data: mappings
    });
  } catch (err) {
    next(err);
  }
};

export const deleteMapping = async (req, res, next) => {
  try {
    const { id } = req.params;
    const mapping = await PatientDoctorMapping.findByPk(id);
    if (!mapping) return res.status(404).json({ message: 'Mapping not found' });
    await mapping.destroy();
    res.json({
      message: 'Mapping removed successfully',
      data: { id: mapping.id }
    });
  } catch (err) {
    next(err);
  }
};
