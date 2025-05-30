const {Router} = require('express');
const rutaPacientes = Router();
const pacientesControllerReal = require('../controllers/API/pacientesController.js')


rutaPacientes.get('/', pacientesControllerReal.mostrarTodos);
rutaPacientes.get('/:dni', pacientesControllerReal.mostrarPorDni)
rutaPacientes.delete('/:dni', pacientesControllerReal.borrarPaciente)
rutaPacientes.post('/',pacientesControllerReal.crearPaciente);
rutaPacientes.put('/:dni',pacientesControllerReal.actualizarMailONombre);


//Otras rutas CRUD

module.exports = rutaPacientes;