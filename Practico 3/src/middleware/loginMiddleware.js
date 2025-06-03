const jwt = require("jsonwebtoken");
const path = require('path')
const  dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env.template') });
const palabra = process.env.PALABRA_SECRETA // 0. Extraigo la palabar secreta de .env.template
// console.log(palabra);

const verifyTokenMiddleware = (req, res, next) => {
  const authHeader = req.header('token');  // buscamos el token en el header de la request
  if (!authHeader) {
    return res.status(401).json({ message: "Acceso denegado" });  // si no hay token entonces el usuario no tiene permitido el uso de la ruta
  }

  const token = authHeader; // si hay token entonces lo extraemos y guardamos en la variable authheader

  try {
    const decoded = jwt.verify(token, palabra); // cheuqeamos si el token es valido
    // req.user = decoded;  No usamos este codigo porque planteamos la solucion del problema diferentemente
    next(); // si todo sale bien entonces el usuario tiene permitido usar la ruta entonces seguimos con la ejecucucion del codigo hacia esa ruta
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message }); // si la verifiacion del token de error entonces devolvemos un error
    } // TODO: Hacer que se le muestre un mensaje de error al usuario cuando intenta hacer operaciones que no tiene permitidas
  }
};

module.exports = { verifyTokenMiddleware }