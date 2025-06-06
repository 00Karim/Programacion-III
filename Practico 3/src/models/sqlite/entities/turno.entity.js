const { DataTypes } = require('sequelize');
const { sequelize } = require('./../config/db.js'); 

const Turno = sequelize.define('Turno', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false // TODO: Hacer que el dni sea una foreign key que apunte al paciente con el dni correspondiente
  },
  doctor: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = {Turno};
