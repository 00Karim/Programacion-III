import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js'; // v2.9.4

function CrearGraficoGastos({setMostrarTabla, setMostrarGrafico, datosGrafico}) {
    const chartRef = useRef(null);

    console.log("DATOS DENTRO DE CREARGARIFO: ", datosGrafico);
    
    const datosLabels = []
    const datosData = []
    const datosColores = []
    const colores = ["#FF6384","#36A2EB","#FFCE56","#4BC0C0","#9966FF","#FF9F40","#00C49F","#FF4444","#0099CC","#FF66CC"] 
    let x = 0 // Esta variable la vamos a usar para ir rotando por la lista de colores asi se van agregando a el grafico circular

    for (let i = 0; i < datosGrafico.length; i++) {
        const dato = datosGrafico[i];
        datosLabels.push(dato.categoria)
        datosData.push(parseInt(dato.total_gastos))
        datosColores.push(colores[x])
        x++
        if(x > colores.length){
            x = 0
        }
    }
    // TODO: Falta hacer el grafico para que sea por mes :(
    console.log(datosLabels);
    console.log(datosData);

    useEffect(() => {

        setMostrarTabla(false) // Se deja de mostrar la tabla y se muestra el grafico
        setMostrarGrafico(true)

        const ctx = chartRef.current.getContext('2d');

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: datosLabels,
                datasets: [
                    {
                        label: 'Gastos por categoría',
                        data: datosData,
                        backgroundColor: datosColores,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
            },
        });
    }, []);

    return (
        <canvas ref={chartRef} style={{ width: '100%', maxWidth: '700px'}}/>
    );
}

export default CrearGraficoGastos;