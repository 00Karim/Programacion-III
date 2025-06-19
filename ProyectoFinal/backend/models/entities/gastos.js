module.exports = function(sequelize, DataTypes) { // ESto se hizo con el comando sequelize-auto
  return sequelize.define('gastos', { // Este codigo no crea la tabla, simplemente crea una instancia de la tabla para que podamos referirnos a ella con js desde el backend
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
