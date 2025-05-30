const pacientesModel = require('./../../models/sqlite/paciente.model.js')

class PacientesController {
    async mostrarTodos(req, res) {
        console.log("Entre a mostrar todos en pacientesController");
        res.status(200).json(await pacientesModel.getPacientes());
    } 
    
    async mostrarPorDni(req, res){

        const dni = req.params.dni

        try {
            const paciente = await pacientesModel.encontrarPorDni(dni);
        
            if (!paciente) {
              return res.status(404).json({ error: 'Paciente no encontrado' });
            }
            res.status(200).json(paciente);
        } 
        catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    borrarPaciente(req, res) {
        const dni = req.params.dni;
        pacientesModel.borrarPaciente(dni);
        res.status(200).json({message:"Paciente eliminado"})
    } // TODO: Try catch para ver si existe el dni (y por si hay error del servidor tambien creo)

    crearPaciente(req, res) {
        const {dni, nombre, email} = req.body
        pacientesModel.crearPaciente(dni, nombre, email)
        res.status(201).json({message:"Paciente creado correctamente"})
    } // TODO: Try catch para ver si existe el dni (y por si hay error del servidor tambien creo)

    actualizarMailONombre(req, res) { // Solo se cambian los atributos si se encuentran dentro del body de la request
        const {nuevoNombre = null, nuevoEmail = null} = req.body
        const dni = req.params.dni
        if(nuevoNombre){
            pacientesModel.actualizarNombre(dni, nuevoNombre)
            res.status(200).json({message:"Nombre actualizado correctamente"})
        }
        if(nuevoEmail){
            pacientesModel.actualizarEmail(dni, nuevoEmail)
            res.status(200).json({message:"Mail actualizado correctamente"})
        }  
    } // TODO: Try catch para ver si existe el dni (y por si hay error del servidor tambien creo)
}

module.exports = new PacientesController();




