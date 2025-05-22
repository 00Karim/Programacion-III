const pacientesModels = require("../../models/mock/pacientes.models");

const login = async (req, res) => {
    res.render('index2');
}

const recibirCredenciales = async (req, res) => {
    const {email,contrasena} = req.body;

    const token = pacientesModels.validate(email, contrasena)

    if(token){
        res.status(200).json(token);
    }else{
        res.status(401).json({message: "Password o usuario incorrecto"});
    }
}

module.exports = {
    login,
    recibirCredenciales
 }