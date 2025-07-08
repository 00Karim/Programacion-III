import React, { useState } from 'react';

function CrearIngresoForm({ setMostrarTabla, setMostrarGrafico, token, id_usuario }) { // TODO: Recibir las props setMostrarTabla y setMostrarGrafico para poder ponerlas ambas en false cuando se renderiza este form, asi no se muestra un grafico o una tabla con el form de crear un ingreso arriba
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
                // Con el codigo siguiente guardamos el input del usuario en variables y hacemos el fetch para agregar el ingreso a la base de datos
                // TODO: IMPORTANTE: VALIDAR INPUT PARA QUE EL USUARIO NO PUEDA INGRESAR UN VALOR VACIO. SI NO HACEMOS ESTO DA ERROR INTERNO DEL SERVIDOR Y SE CAE TODO
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