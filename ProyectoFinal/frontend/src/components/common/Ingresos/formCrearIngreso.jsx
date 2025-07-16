import React, { useState } from 'react';

function CrearIngresoForm({ setMostrarTabla, setMostrarGrafico, token, id_usuario }) { 
    console.log("formCrearIngreso.jsx");
    
    const [origen, setOrigen] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [fecha, setFecha] = useState('');

    setMostrarTabla(false) // Si se clickea nuevamente o por primera vez la operacion de crear un ingreso entonces se debe dejar de mostrar la tabla o el grafico que este debajo
    setMostrarGrafico(false)

    return (
        <form onSubmit={
            async (e) => {
                e.preventDefault()
                if (!origen){
                    alert("Error, ingresa una origen!")
                    return
                }
                if(!cantidad){
                    alert("Error, ingresa una cantidad!")
                    return
                }
                if(!fecha){
                    alert("Error, ingresa una fecha!")
                    return
                }
                await fetch('/api/ingresos/', 
                    {
                        method: 'POST', 
                        headers: 
                            {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer: ${token}`
                            }, 
                        body: JSON.stringify({origen, cantidad, fecha, id_usuario}) //como nos mandamos el id_usuario directamente desde el back, no tenemos que decodificarlo para usarlo aca
                    }
                )
            
                setOrigen('');
                setCantidad('');
                setFecha('');
            }
        } style={{ marginTop: '20px' }}>
            <div>
                <label>Origen:</label>
                <input
                    type="text"
                    value={origen}
                    onChange={(e) => setOrigen(e.target.value)}
                    placeholder="Ej: Trabajo"
                />
            </div>
            <div>
                <label>Cantidad:</label>
                <input
                    type="number"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    placeholder="Ej: 250.00"
                />
            </div>
            <div>
                <label>Fecha:</label>
                <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                />
            </div>
            <button type="submit">Agregar ingreso</button>
        </form>
    );
}

export default CrearIngresoForm;