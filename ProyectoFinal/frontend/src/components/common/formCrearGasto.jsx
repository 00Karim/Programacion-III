import React, { useState } from 'react';

function CrearGastoForm({ agregarABaseDeDatos = null }) {
    console.log("formCrearGasto.jsx");
    
    const [categoria, setCategoria] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [fecha, setFecha] = useState('');

    return (
        <form onSubmit={
            (e) => {
                e.preventDefault()
                // Con el codigo siguiente guardamos el input del usuario en variables y hacemos el fetch para agregar el gasto a la base de datos
                const nuevoGasto = {
                    categoria,
                    cantidad: parseFloat(cantidad),
                    fecha
                };
            
                //agregarABaseDeDatos(nuevoGasto);
            
                setCategoria('');
                setCantidad('');
                setFecha('');
            }
        } style={{ marginTop: '20px' }}>
            <div>
                <label>Categoría:</label>
                <input
                    type="text"
                    valor={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    placeholder="Ej: Comida"
                />
            </div>
            <div>
                <label>Cantidad:</label>
                <input
                    type="number"
                    valor={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    placeholder="Ej: 250.00"
                />
            </div>
            <div>
                <label>Fecha:</label>
                <input
                    type="date"
                    valor={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                />
            </div>
            <button type="submit">Agregar gasto</button>
        </form>
    );
}

export default CrearGastoForm;