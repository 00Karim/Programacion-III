// backend/models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/database');
const gastosModel = require('./entities/gastos')
const ingresosModel = require('./entities/ingresos')

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
    dialectOptions: dbConfig.dialectOptions
  }
);

const Gastos = gastosModel(sequelize, Sequelize.DataTypes) // Creamos la instancia de gastos con el modelo creado en gastos.js
const Ingresos = ingresosModel(sequelize, Sequelize.DataTypes) // Creamos la instancia de ingresos con el modelo creado en ingresos.js


module.exports = {
  sequelize,
  Sequelize,
  Gastos,
  Ingresos
};