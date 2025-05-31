const {Router} = require('express');
const rutaTurnos = Router();
const turnosController = require('../controllers/API/turnos.controller.js')
const { verifyTokenMiddleware } = require('../middleware/loginMiddleware.js')


rutaTurnos.get('/:dni', turnosController.buscarPorDni);
rutaTurnos.delete('/:id', verifyTokenMiddleware, turnosController.eliminarTurno)
rutaTurnos.post('/', verifyTokenMiddleware, turnosController.agregarTurno)



//Otras rutas CRUD

module.exports = rutaTurnos;