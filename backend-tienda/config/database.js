const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tiendagamer_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3307, // <--- ¡CLAVE! Usamos 3307 porque es tu puerto abierto
  logging: false
});

module.exports = sequelize;