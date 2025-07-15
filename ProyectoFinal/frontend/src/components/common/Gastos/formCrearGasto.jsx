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
                if (!categoria){
                    alert("Error, ingresa una categoria!")
                }
                else if(!cantidad){
                    alert("Error, ingresa una cantidad!")
                }
                else if(!fecha){
                    alert("Error, ingresa una fecha!")
                }
                e.preventDefault()
                // Con el codigo siguiente guardamos el input del usuario en variables y hacemos el fetch para agregar el gasto a la base de datos
                // TODO: IMPORTANTE: VALIDAR INPUT PARA QUE EL USUARIO NO PUEDA INGRESAR UN VALOR VACIO. SI NO HACEMOS ESTO DA ERROR INTERNO DEL SERVIDOR Y SE CAE TODO
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