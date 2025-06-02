const jwt = require("jsonwebtoken")
const path = require('path')
const  dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../../.env.template') });
const palabra = process.env.PALABRA_SECRETA // 0. Extraigo la palabar secreta de .env.template
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
                palabra, 
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