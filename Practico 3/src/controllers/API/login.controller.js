const LoginModel = require("../../models/sqlite/login.model.js");

const login = async (req, res) => {
    res.render('index2');
}

const recibirCredenciales = async (req, res) => {
    const {usuario,contrasenia} = req.body;

    const token = await LoginModel.validate(usuario, contrasenia)

    if(token){
        res.status(200).json({token});
    }else{
        res.status(401).json({message: "Password o usuario incorrecto"});
    }
}

module.exports = {
    login,
    recibirCredenciales
 }