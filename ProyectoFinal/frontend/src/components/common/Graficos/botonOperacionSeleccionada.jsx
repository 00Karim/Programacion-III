function CrearBotonOperacionSeleccionada({ key_value, titulo, operacionSeleccionada, setOperacionSeleccionada, mostrarFormulario}) {

    return (
        <>
            <button key={key_value} 
                onClick={() => {
                    setOperacionSeleccionada(operacionSeleccionada);
                    mostrarFormulario() // ESta funcion hace que se muestre el formulario correspondiente al boton creado cuando se lo clickea (basicamente el boton sirve para hacer aparecer el form)
                }}>
                {titulo}
            </button>
        </>
    );
}

export default CrearBotonOperacionSeleccionada;