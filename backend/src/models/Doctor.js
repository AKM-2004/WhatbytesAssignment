import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/database.js';
import User from './User.js';

const Doctor = sequelize.define('Doctor', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hospital: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  consultationFees: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  availability: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'doctors',
});


export default Doctor;
