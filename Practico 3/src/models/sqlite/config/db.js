const { Sequelize } = require('sequelize');

const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'db', 'clinica.sqlite'),
    logging: false
});

const connectDB = async () => {
    require('./../entities/paciente.entity.js');
    require('./../entities/turno.entity.js');
    require('./../entities/empleadoCredenciales.entity.js')
    try {
        await sequelize.sync();
        console.log('Base de datos conectada.');
    } catch (error) {
        console.error('Error conectando a la base de datos:', error);
    }
};

module.exports = {sequelize, connectDB};