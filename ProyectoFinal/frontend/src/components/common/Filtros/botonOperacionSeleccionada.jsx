function CrearBotonOperacionSeleccionada({ key_value, titulo, operacionSeleccionada, setOperacionSeleccionada, mostrarFormulario, setMostrarTabla, setMostrarGrafico, esGrafico}) {

    return (
        <>
            {!esGrafico ? 
                <button key={key_value} 
                    onClick={() => {
                        setOperacionSeleccionada(operacionSeleccionada);
                        mostrarFormulario() // ESta funcion hace que se muestre el formulario correspondiente al boton creado cuando se lo clickea (basicamente el boton sirve para hacer aparecer el form)
                        setMostrarTabla(false) // Si el usuario hace click para seleccionar una funcion anterior entonces se tienen que dejar de mostrar los datos de la operacion anterior, si es que se uso y por ende se renderizaron, para evitar que sea inconsistente el titulo y los datos mostrados
                        setMostrarGrafico(false)
                    }}>
                    {titulo}
                </button>
            :
                <button key={key_value} 
                    onClick={() => {
                        setOperacionSeleccionada(operacionSeleccionada);
                        mostrarFormulario() // ESta funcion hace que se muestre el formulario correspondiente al boton creado cuando se lo clickea (basicamente el boton sirve para hacer aparecer el form)
                        setMostrarTabla(false) // Si el usuario hace click para seleccionar una funcion anterior entonces se tienen que dejar de mostrar los datos de la operacion anterior, si es que se uso y por ende se renderizaron, para evitar que sea inconsistente el titulo y los datos mostrados
                        setMostrarGrafico(false)
                    }}>
                    {titulo}
                </button>
                
           }
        </>
    );
}

export default CrearBotonOperacionSeleccionada;