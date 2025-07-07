const { Router } = require('express');
const rutaUsuarios = Router();
const usuariosController = require('../controllers/usuarios.controller');

rutaUsuarios.post('/login', usuariosController.login);

module.exports = rutaUsuarios;