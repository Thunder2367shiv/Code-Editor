// models/User.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const User = sequelize.define('User', {
  uid: {
    type: DataTypes.STRING,
    allowNull: true, // allowNull true because email-password users won't have uid
    unique: false,
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
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
