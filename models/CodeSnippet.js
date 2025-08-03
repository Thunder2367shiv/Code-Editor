// models/CodeSnippet.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { User } from './User.js';

export const CodeSnippet = sequelize.define('CodeSnippet', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  code: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

User.hasMany(CodeSnippet, { foreignKey: 'userId', onDelete: 'CASCADE' });
CodeSnippet.belongsTo(User, { foreignKey: 'userId' });
