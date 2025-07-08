function MostrarGetTablas({operacionSeleccionada, datos, setDatos, entidad, token}){
    
    const listaActualizada = []
    
    const handleClickBorrar = async (id) => {
        await fetch(`/api/${entidad}/${id}`,
            {
                method: 'DELETE',
                headers: 
                    {
                        'Authorization': `Bearer: ${token}`
                    } 
            }
        )
        for(let i = 0; i < datos.length; i++){ // modificamos los datos de la variable de estado para que se actualize la tabla en timepo real, sino hacemos esto tendriamos que esperar a que el usuario haga un nuevo get para que se vean reflejados los cambios en la variable de estado
            if (entidad === "ingresos"){
                if(datos[i].id_ingreso !== id){ 
                    listaActualizada.push(datos[i])
                }
            }
            else{
                if(datos[i].id_gasto !== id){ 
                    listaActualizada.push(datos[i])
                }
            }                                   
        }
        setDatos(listaActualizada)                                            
    }                                                 
    

    return ( 
        <>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cantidad</th>
                        <th>{entidad === "gastos" ? "Categoria" : "Origen"}</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.length === 0 ? ( // Si no se ingreso ningun dato en los gets (da error 404 el fetch), entonces se va a mostrar una tabla vacia
                        <tr>
                            <td>No existe</td>
                            <td>No existe</td>
                            <td>No existe</td>
                            <td>No existe</td> 
                            <td></td>
                        </tr>
                    ) : (
                        datos.map((dato) => (
                        <tr key={entidad === "gastos" ? dato.id_gasto : dato.id_ingreso}>
                            <td>{entidad === "gastos" ? dato.id_gasto : dato.id_ingreso}</td>
                            <td>{dato.cantidad}</td>
                            <td>{entidad === "gastos" ? dato.categoria : dato.origen}</td>
                            <td>{dato.fecha}</td>
                            <td><button onClick={() => handleClickBorrar(entidad === "gastos" ? dato.id_gasto : dato.id_ingreso)}>Borrar</button></td>
                        </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    )

}

export default MostrarGetTablas;