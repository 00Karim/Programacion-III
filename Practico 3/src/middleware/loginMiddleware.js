const jwt = require("jsonwebtoken");

const verifyTokenMiddleware = (req, res, next) => {
  const authHeader = req.header('authorization');  // 1. Busca el token en el header
  if (!authHeader) {
    return res.status(401).json({ message: "Token de acceso no proporcionado" });  // 2. Si no hay token, error
  }

  const token = authHeader;

  try {
    const decoded = jwt.verify(token, "palabraSecreta"); // 3. Verifica que el token sea válido
    req.user = decoded;  // 4. Guarda la info del usuario en el objeto `req` para usar después
    next(); // 5. Llama al siguiente middleware o controller
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message }); // 6. Si falla la verificación, da error
    }
  }
};

module.exports = { verifyTokenMiddleware }