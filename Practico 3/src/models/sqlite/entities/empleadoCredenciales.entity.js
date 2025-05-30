const { DataTypes } = require('sequelize');
const {sequelize} = require('./../config/db.js');

const CredencialesEmpleado = sequelize.define('CredencialesEmpleado', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario: 
        {
                type: DataTypes.STRING,
                allowNull: false,
        },
  contrasenia: 
        {
                type: DataTypes.STRING,
                allowNull: false,
        }
});

module.exports = {CredencialesEmpleado};