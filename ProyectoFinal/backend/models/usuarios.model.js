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
        return [token, usuario.id_usuario]; // tambien devolvemos el id_usuario para no tener que decodificarlo en el front siempre que lo querramos usar para crear una nueva entidad
    }

}

module.exports = new UsuariosModel();