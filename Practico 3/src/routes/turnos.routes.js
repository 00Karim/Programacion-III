const {Router} = require('express');
const rutaTurnos = Router();
const turnosController = require('../controllers/API/turnos.controller.js')


rutaTurnos.get('/', turnosController.buscarPorDniONombre);



//Otras rutas CRUD

module.exports = rutaTurnos;