import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/database.js';
import User from './User.js';

const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('MALE', 'FEMALE', 'OTHER'),
    allowNull: false,
  },
  medicalHistory: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  allergies: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  emergencyContact: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'patients',
});

User.hasMany(Patient, { foreignKey: 'userId', as: 'patients' });
Patient.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Patient;
