// models/Comment.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { User } from './User.js';
import { CodeSnippet } from './CodeSnippet.js';

export const Comment = sequelize.define('Comment', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
}, {
  timestamps: true,
});

User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'userId' });

CodeSnippet.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE' });
Comment.belongsTo(CodeSnippet, { foreignKey: 'postId' });
