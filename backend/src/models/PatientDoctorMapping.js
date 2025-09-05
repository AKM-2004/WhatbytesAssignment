import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/database.js';
import Patient from './Patient.js';
import Doctor from './Doctor.js';

const PatientDoctorMapping = sequelize.define('PatientDoctorMapping', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  status: {
    type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'COMPLETED', 'CANCELLED'),
    defaultValue: 'ACTIVE',
  },
}, {
  tableName: 'patient_doctor_mappings',
});

// Define direct associations for includes
PatientDoctorMapping.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });
PatientDoctorMapping.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });

Patient.hasMany(PatientDoctorMapping, { foreignKey: 'patientId', as: 'mappings' });
Doctor.hasMany(PatientDoctorMapping, { foreignKey: 'doctorId', as: 'mappings' });

// Many-to-many associations
Patient.belongsToMany(Doctor, {
  through: PatientDoctorMapping,
  foreignKey: 'patientId',
  otherKey: 'doctorId',
  as: 'doctors',
});
Doctor.belongsToMany(Patient, {
  through: PatientDoctorMapping,
  foreignKey: 'doctorId',
  otherKey: 'patientId',
  as: 'patients',
});

export default PatientDoctorMapping;
