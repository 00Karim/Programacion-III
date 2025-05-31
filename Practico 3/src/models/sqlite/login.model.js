const jwt = require("jsonwebtoken")
const { CredencialesEmpleado } = require('../sqlite/entities/empleadoCredenciales.entity');


class LoginModel{
    validate = async (usuario, contrasenia) => {
        try {
            const userFound = await CredencialesEmpleado.findOne(
                {
                    where: {usuario: usuario}
                });

            if (!userFound || userFound.contrasenia != contrasenia) {
                return null;
            }

            // payload, secreto, tiempo de expiración
            const payload = {
                userId: userFound.usuario,
                userContrasenia: userFound.contrasenia,
            };

            const token = jwt.sign(
                payload,
                "palabraSecreta", // TODO: Remplazar ese string por la variable palabra secreta en .env
                {
                    expiresIn: "24h",
                }
            );
            return token;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new LoginModel()