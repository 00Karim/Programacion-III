function MostrarGetTablas({operacionSeleccionada, gastosAPI}){
    
    let gastos = [
        {id_gasto: 1, categoria: 'Servicios', cantidad: 90, fecha: '2025-03-22'}, 
        {id_gasto: 2, categoria: 'Farmacia', cantidad: 300, fecha: '2025-03-05'}
    ]

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
                    {gastos.map(
                        (gasto) => 
                        {
                            return (
                                <tr key={gasto.id_gasto}>
                                    <td>{operacionSeleccionada ? gasto.id_gasto : "Vacio"}</td>
                                    <td>{operacionSeleccionada ? gasto.categoria : "Vacio"}</td>
                                    <td>{operacionSeleccionada ? gasto.cantidad : "Vacio"}</td>
                                    <td>{operacionSeleccionada ? gasto.fecha : "Vacio"}</td>
                                    <td>
                                        <button>Borrar</button> {/* TODO: Hay que agregarle la funcionalidad*/}
                                    </td>
                                </tr>)
                        }
                    )}
                </tbody>
            </table>
        </>
    )

}

export default MostrarGetTablas;