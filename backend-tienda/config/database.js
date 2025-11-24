const { Sequelize } = require('sequelize');

// DATOS DE CLEVER CLOUD (Tu Base de Datos en Internet)
const sequelize = new Sequelize('bqsum5pdrblqtppbxvtj', 'uoxkrchaiq8jumni', '0Ty37UfjmZdPm0KXeYo6', {
  host: 'bqsum5pdrblqtppbxvtj-mysql.services.clever-cloud.com',
  dialect: 'mysql',
  port: 3306, // Clever Cloud usa el puerto estándar
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Necesario para conexiones seguras en la nube
    }
  }
});

module.exports = sequelize;