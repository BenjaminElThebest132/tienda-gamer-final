const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Producto = sequelize.define('Producto', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.INTEGER, // O FLOAT si usas decimales
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING
  },
  imagen: {
    type: DataTypes.STRING // Guardaremos la URL de la imagen
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = Producto;