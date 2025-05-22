const {Router} = require('express');
const {login, recibirCredenciales} = require('../controllers/API/login.controller.js')
const rutaLogin = Router();

rutaLogin.get('/', login);
rutaLogin.post('/', recibirCredenciales)

//Otras rutas CRUD

module.exports = rutaLogin;