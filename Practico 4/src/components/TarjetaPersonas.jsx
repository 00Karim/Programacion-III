const TarjetaPersona = ({ persona }) => {
    return (
      <div className="tarjeta">
        <p>Nombre: {persona.nombre}</p>
        <p>Apellido: {persona.apellido}</p>
        <p>Edad: {persona.edad}</p>
        <p>Email: {persona.email}</p>
      </div>
    );
  };
  
  export default TarjetaPersona;
  