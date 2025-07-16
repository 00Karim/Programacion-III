import React, { useState } from 'react';

function CrearGastoForm({ setMostrarTabla, setMostrarGrafico, token, id_usuario }) {
    console.log("formCrearGasto.jsx");
    
    const [categoria, setCategoria] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [fecha, setFecha] = useState('');

    //const token = localStorage.getItem("token")
    //const id_usuario = payload token

    setMostrarTabla(false) // Si se clickea nuevamente o por primera vez la operacion de crear un ingreso entonces se debe dejar de mostrar la tabla o el grafico que este debajo
    setMostrarGrafico(false)

    return (
        <form onSubmit={
            async (e) => {
                e.preventDefault()
                if (!categoria){
                    alert("Error, ingresa una categoria!")
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
                await fetch('/api/gastos/', 
                    {
                        method: 'POST', 
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }, 
                        body: JSON.stringify({categoria, cantidad, fecha, id_usuario})
                    }
                )
            
                setCategoria('');
                setCantidad('');
                setFecha('');
            }
        } style={{ marginTop: '20px' }}>
            <div>
                <label>Categoría:</label>
                <input
                    type="text"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    placeholder="Ej: Comida"
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
            <button type="submit">Agregar gasto</button>
        </form>
    );
}

export default CrearGastoForm;