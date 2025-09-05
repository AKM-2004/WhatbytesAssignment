import Patient from '../models/Patient.js';

export const createPatient = async (req, res, next) => {
  try {
    const { name, age, gender, medicalHistory, allergies, emergencyContact } = req.body;
    
    if (!name || !age || !gender) {
      return res.status(400).json({ message: 'name, age, and gender are required' });
    }
    
    // Convert gender to uppercase to match database enum
    const validGender = gender.toUpperCase();
    
    // Validate gender values
    if (!['MALE', 'FEMALE', 'OTHER'].includes(validGender)) {
      return res.status(400).json({ message: 'gender must be MALE, FEMALE, or OTHER' });
    }
    
    const patient = await Patient.create({
      name,
      age: parseInt(age),
      gender: validGender,
      medicalHistory,
      allergies,
      emergencyContact,
      userId: req.user.id
    });
    
    res.status(201).json({
      message: 'Patient created successfully',
      data: patient
    });
  } catch (error) {
    next(error);
  }
};

export const getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.findAll({ where: { userId: req.user.id } });
    res.json({
      message: 'Patients retrieved successfully',
      data: patients
    });
  } catch (err) {
    next(err);
  }
};

export const getPatient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findOne({ where: { id, userId: req.user.id } });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json({
      message: 'Patient retrieved successfully',
      data: patient
    });
  } catch (err) {
    next(err);
  }
};

export const updatePatient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findOne({ where: { id, userId: req.user.id } });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    
    const updateData = { ...req.body };
    console.log('UPDATE DATA:', updateData);
    
    if (updateData.gender) {
      const validGender = updateData.gender.toString().toUpperCase();
      console.log('CONVERTING GENDER:', updateData.gender, '→', validGender);
      
      if (!['MALE', 'FEMALE', 'OTHER'].includes(validGender)) {
        return res.status(400).json({ message: 'gender must be MALE, FEMALE, or OTHER' });
      }
      updateData.gender = validGender;
    }
    
    await patient.update(updateData);
    res.json({
      message: 'Patient updated successfully',
      data: patient
    });
  } catch (err) {
    next(err);
  }
};

export const deletePatient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findOne({ where: { id, userId: req.user.id } });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    await patient.destroy();
    res.json({
      message: 'Patient deleted successfully',
      data: { id: patient.id }
    });
  } catch (err) {
    next(err);
  }
};
