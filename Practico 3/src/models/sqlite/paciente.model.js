const {Paciente} = require('../sqlite/entities/paciente.entity.js');

class PacientesModel{
  getPacientes =  ()=>{
    const users = Paciente.findAll();
    return users;
  }

  findByEmail = (email, password) => {
    const paciente = this.data.find(p=>p.email===email && p.password===password)
    //TODO: Corroborar que exista paciente con try catch
    return paciente;
  }
//TODO: agregar operaciones CRUD
}
  module.exports = {
    PacientesModel
  }
