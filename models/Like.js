// models/Like.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { User } from './User.js';
import { CodeSnippet } from './CodeSnippet.js';

export const Like = sequelize.define('Like', {}, {
  timestamps: true,
});
 
User.belongsToMany(CodeSnippet, { through: Like, foreignKey: 'userId' });
CodeSnippet.belongsToMany(User, { through: Like, foreignKey: 'postId' });
