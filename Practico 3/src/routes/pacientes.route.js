const {Router} = require('express');
const rutaPacientes = Router();
const pacientesControllerReal = require('../controllers/API/pacientesController.js')
const { verifyTokenMiddleware } = require('../middleware/loginMiddleware.js')


rutaPacientes.get('/', verifyTokenMiddleware, pacientesControllerReal.mostrarTodos);
rutaPacientes.get('/:dni', verifyTokenMiddleware, pacientesControllerReal.mostrarPorDni)
rutaPacientes.delete('/:dni', verifyTokenMiddleware, pacientesControllerReal.borrarPaciente)
rutaPacientes.post('/', verifyTokenMiddleware, pacientesControllerReal.crearPaciente);
rutaPacientes.put('/:dni', verifyTokenMiddleware, pacientesControllerReal.actualizarMailONombre);


//Otras rutas CRUD

module.exports = rutaPacientes;