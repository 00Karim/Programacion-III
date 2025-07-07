const { Usuarios } = require('./index');  
const jwt = require('jsonwebtoken');

class UsuariosModel {
    
    async verificarUsuario(nombre, contrasenia) { // si existe devolvemos el usuario que luego se va a extraer su id para poner en el payload
        const usuario = await Usuarios.findOne({
            where: { nombre, contrasenia }
        });
        return usuario;
    }

  
    generarToken(usuario) {
        const payload = { id_usuario: usuario.id_usuario }; 
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'PALAbrapiola', { expiresIn: '1h' });
        return token;
    }

}

module.exports = new UsuariosModel();