const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ mensaje: 'Falta el token' });

    const token = authHeader.split(' ')[1]; // como usamos la estructura estandar para mandar un token por el header de una request: `Bearer: ${token}`, entonces extraemos el token con el split en el primer espacio

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || 'PALAbrapiola');
        req.usuario = payload; // ahora se pueda acceder al id_usuario desde req.usuario para poder agregarlo como parametro en las operaciones de ingresos y gastos
        next(); // seguimos ejecutando la ruta siguiente ya con la posibilidad de acceder al id_usuario a traves de req.usuario.id_usuario
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
}

module.exports = verificarToken;