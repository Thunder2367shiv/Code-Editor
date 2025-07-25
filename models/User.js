// models/User.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const User = sequelize.define('User', {
  uid: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
  }, 
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  picture: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});
