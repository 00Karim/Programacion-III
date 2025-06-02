const jwt = require("jsonwebtoken");
const path = require('path')
const  dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env.template') });
const palabra = process.env.PALABRA_SECRETA // 0. Extraigo la palabar secreta de .env.template
// console.log(palabra);

const verifyTokenMiddleware = (req, res, next) => {
  const authHeader = req.header('token');  // 1. Busca el token en el header
  if (!authHeader) {
    return res.status(401).json({ message: "Acceso denegado" });  // 2. Si no hay token, error
  }

  const token = authHeader; // Asi solo sacamos el token

  try {
    const decoded = jwt.verify(token, palabra); // 3. Verifica que el token sea válido
    req.user = decoded;  // 4. Guarda la info del usuario en el objeto `req` para usar después
    next(); // 5. Llama al siguiente middleware o controller
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message }); // 6. Si falla la verificación, da error
    }
  }
};

module.exports = { verifyTokenMiddleware }