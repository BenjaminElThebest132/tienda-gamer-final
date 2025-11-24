const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Orden = sequelize.define('Orden', {
  total: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'pendiente' // pendiente, pagado, enviado
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Orden;