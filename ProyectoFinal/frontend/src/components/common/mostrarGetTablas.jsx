function MostrarGetTablas({operacionSeleccionada, datosGastos, setDatosGastos}){

    const listaActualizada = []

    const handleClickBorrar = async (id) => {
        await fetch(`/api/gastos/${id}`, {method: 'DELETE'})
        for(let i = 0; i < datosGastos.length; i++){ // El array datosGastos aun no fue modificado por lo que no se puede ver el cambio en tiempo real...
            if(datosGastos[i].id_gasto !== id){              // sino que se tiene que esperar a hacer una nueva operacion para que se actualize el array y, 
                listaActualizada.push(datosGastos[i])// consecuentemente, renderize la tabla. Nosotros queremos que al borrar un gasto entonces
            }                                        // la fila correspondiente desaparezca al hacerle click al boton. Para eso sirve esta seccion del codigo.
        }
        setDatosGastos(listaActualizada)                                            
    }                                                 
    

    return ( 
        <>
            <h1>{!operacionSeleccionada && "Esperando operacion..."}</h1> {/*Si no hay una operacion seleccionado entonces se muestra el titulo "Esperando operacion, sino se muestra el titulo de la operacion seleccionada"*/}
            <h1>{operacionSeleccionada}</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cantidad</th>
                        <th>Categoria</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {datosGastos.length === 0 ? ( // Si no se ingreso ningun dato en los gets (da error 404 el fetch), entonces se va a mostrar una tabla vacia
                        <tr>
                            <td>No existe</td>
                            <td>No existe</td>
                            <td>No existe</td>
                            <td>No existe</td>
                            <td></td>
                        </tr>
                    ) : (
                        datosGastos.map((gasto) => (
                        <tr key={gasto.id_gasto}>
                            <td>{gasto.id_gasto}</td>
                            <td>{gasto.categoria}</td>
                            <td>{gasto.cantidad}</td>
                            <td>{gasto.fecha}</td>
                            <td><button onClick={() => handleClickBorrar(gasto.id_gasto)}>Borrar</button></td>
                        </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    )

}

export default MostrarGetTablas;