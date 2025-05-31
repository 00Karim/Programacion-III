const { Paciente } = require('./../entities/paciente.entity.js')
const { Turno } = require('./../entities/turno.entity.js')
const { CredencialesEmpleado } = require('./../entities/empleadoCredenciales.entity.js')
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
    await Turno.bulkCreate([
      {
        fecha: new Date('2025-06-10T09:00:00'),
        dni: '12345678',
        doctor: 'Dr. Ramírez'
      },
      {
        fecha: new Date('2025-06-11T10:30:00'),
        dni: '87654321',
        doctor: 'Dra. López'
      },
      {
        fecha: new Date('2025-06-12T08:45:00'),
        dni: '11223344',
        doctor: 'Dr. Fernández'
      },
      {
        fecha: new Date('2025-06-13T11:15:00'),
        dni: '12345678',
        doctor: 'Dra. Martínez'
      },
      {
        fecha: new Date('2025-06-14T14:00:00'),
        dni: '87654321',
        doctor: 'Dr. Suárez'
    }]);
    await CredencialesEmpleado.bulkCreate([
      {
        usuario: 'jlopez',
        contrasenia: 'clave1234'
      },
      {
        usuario: 'mgarcia',
        contrasenia: 'pass2025'
      },
      {
        usuario: 'arodriguez',
        contrasenia: 'segura789'
      },
      {
        usuario: 'cfernandez',
        contrasenia: 'admin987'
      }
    ]);
    
    console.log('Datos insertados correctamente.');
  } catch (error) {
    console.error('Error insertando pacientes:', error);
  }
};

module.exports = {cargarDatos}