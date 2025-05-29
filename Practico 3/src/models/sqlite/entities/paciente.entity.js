const { DataTypes } = require('sequelize');
const {sequelize} = require('./../config/db.js');

const Paciente = sequelize.define('Paciente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: DataTypes.STRING,
  email: DataTypes.STRING,
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = {Paciente};