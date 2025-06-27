const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ingresos', {
    id_ingreso: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    origen: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ingresos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ingresos_pkey",
        unique: true,
        fields: [
          { name: "id_ingreso" },
        ]
      },
    ]
  });
};
