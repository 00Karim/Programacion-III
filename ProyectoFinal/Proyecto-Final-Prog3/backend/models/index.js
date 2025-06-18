// backend/models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/database');
const gastosModel = require('./gastos')

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

module.exports = {
  sequelize,
  Sequelize,
  Gastos
};