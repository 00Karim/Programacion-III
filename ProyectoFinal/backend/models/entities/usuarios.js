const Sequelize = require('sequelize'); // Esto se hizo con el comando sequelize-auto
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuarios', {
    id_usuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true
    },
    contrasenia: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'usuarios',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "usuarios_pkey",
        unique: true,
        fields: [
          { name: "id_usuario" },
        ]
      },
      {
        name: "usuarios_nombre_key",
        unique: true,
        fields: [
          { name: "nombre" },
        ]
      },
    ]
  });
};