const UsuariosModel = require('../models/usuarios.model');

class UsuariosController {
    async login(req, res) {
        const { nombre, contrasenia } = req.body;
        if (!nombre || !contrasenia) { // si el usuario no ingreso alguna de las credenciales entonces deolvemos error 400
            return res.status(400).json({ error: 'Faltan credenciales' });
        }

        try {
            const usuario = await UsuariosModel.verificarUsuario(nombre, contrasenia); 
            if (!usuario) {
                return res.status(401).json({ error: 'Nombre de usuario o contrasenia incorrectos' });
            }

            const tokenEid_usuario = UsuariosModel.generarToken(usuario) // esto devuelve un array, el primer dato es el token y el segundo es el id de usuario
            const id_usuario = tokenEid_usuario[1]
            const token = tokenEid_usuario[0]; // si las credenciales existen en la tabla usuarios entonces devolvemos el token que va a llevar el id_usuario dentro
                return res.status(200).json({ token, id_usuario }); // devolvemos el token en formato json: { "token": <info encriptada> } y devolvemos el id del usuario para no tener que decodificarlo siempre que querramos usarlo en el front cuando hacemos los fetchs
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

module.exports = new UsuariosController();