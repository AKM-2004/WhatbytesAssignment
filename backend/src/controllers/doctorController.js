import Doctor from '../models/Doctor.js';

export const createDoctor = async (req, res, next) => {
  try {
    const { name, specialization, hospital, consultationFees, availability } = req.body;
    
    if (!name || !specialization) {
      return res.status(400).json({ message: 'name and specialization are required' });
    }
    
    const doctor = await Doctor.create({
      name,
      specialization,
      hospital,
      consultationFees: consultationFees ? parseFloat(consultationFees) : null,
      availability
    });
    
    res.status(201).json({
      message: 'Doctor created successfully',
      data: doctor
    });
  } catch (error) {
    next(error);
  }
};

export const getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.findAll();
    res.json({
      message: 'Doctors retrieved successfully',
      data: doctors
    });
  } catch (err) {
    next(err);
  }
};

export const getDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByPk(id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json({
      message: 'Doctor retrieved successfully',
      data: doctor
    });
  } catch (err) {
    next(err);
  }
};

export const updateDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByPk(id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    await doctor.update(req.body);
    res.json({
      message: 'Doctor updated successfully',
      data: doctor
    });
  } catch (err) {
    next(err);
  }
};

export const deleteDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByPk(id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    await doctor.destroy();
    res.json({
      message: 'Doctor deleted successfully',
      data: { id: doctor.id }
    });
  } catch (err) {
    next(err);
  }
};
