const Sequelize = require('sequelize'); // Esto se hizo con el comando sequelize-auto
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gastos', {
    id_gasto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    categoria: {
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
    tableName: 'gastos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "gastos_pkey",
        unique: true,
        fields: [
          { name: "id_gasto" },
        ]
      },
    ]
  });
};
