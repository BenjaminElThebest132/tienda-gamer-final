const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // No permite correos repetidos
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.STRING,
    defaultValue: 'cliente' // Por defecto es cliente
  }
});

module.exports = Usuario;