const {Router} = require('express');
const {login, recibirCredenciales} = require('../controllers/API/login.controller.js')
const PacientesController = require('./../controllers/API/pacientesController.js')
const rutaLogin = Router();

rutaLogin.get('/', login);
rutaLogin.get('/usuario', PacientesController.renderizar)
rutaLogin.post('/', recibirCredenciales)

//Otras rutas CRUD

module.exports = rutaLogin;