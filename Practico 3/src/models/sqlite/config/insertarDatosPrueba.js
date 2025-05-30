const { Paciente } = require('./../entities/paciente.entity.js')
const { connectDB } = require('./db.js');

const cargarDatos = async () => {
  await connectDB();

  try {
    await Paciente.bulkCreate([
      {
        nombre: 'Ana Pérez',
        email: 'ana.perez@gmail.com',
        dni: '12345678'
      },
      {
        nombre: 'Carlos Gómez',
        email: 'carlos.gomez@gmail.com',
        dni: '87654321'
      },
      {
        nombre: 'Laura Fernández',
        email: 'laura.fernandez@gmail.com',
        dni: '11223344'
      }
    ]);

    console.log('Pacientes insertados correctamente.');
  } catch (error) {
    console.error('Error insertando pacientes:', error);
  }
};

module.exports = {cargarDatos}