import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Lead = sequelize.define('Lead', {
  name: { type: DataTypes.STRING, allowNull: false },
  contact: { type: DataTypes.STRING, allowNull: false },
  tariff: { type: DataTypes.STRING, allowNull: false },
  comment: { type: DataTypes.TEXT, allowNull: true }
});
