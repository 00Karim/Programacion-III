function CrearBotonOperacionSeleccionada({ key_value, titulo, operacionSeleccionada, setOperacionSeleccionada }) {
    return (
      <button key={key_value} onClick={() => setOperacionSeleccionada(operacionSeleccionada)}>
        {titulo}
      </button>
    );
}

export default CrearBotonOperacionSeleccionada;