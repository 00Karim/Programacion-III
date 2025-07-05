import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js'; // v2.9.4

function CrearGraficoGastos({setMostrarTabla, setMostrarGrafico, datosGrafico}) { // TODO: Recibir las props setMostrarTabla y setMostrarGrafico para poder ponerlas ambas en false cuando se renderiza este form, asi no se muestra un grafico o una tabla con el form de crear un gasto arriba
    const chartRef = useRef(null);
    
    console.log("DATOS EN CREAR GRAFICO: ", datosGrafico);
    

    const datosLabels = []
    const datosData = []
    const datosColores = []
    const colores = ["#FF6384","#36A2EB","#FFCE56","#4BC0C0","#9966FF","#FF9F40","#00C49F","#FF4444","#0099CC","#FF66CC"]

    const meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"] 
    let x = 0 // Esta variable la vamos a usar para ir rotando por la lista de colores asi se van agregando a el grafico circular
    
    if (datosGrafico[0].categoria){ // Si el objeto tiene un atributo categoria entonces vamos a saber que la operacion seleccionada fue la de agrupar por categoria (sino, es la de agrupar por mes) entonces vamos a tener que guardar los datos que vamos a usar para el grafico correspondiente
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
    }
    else{
        for (let i = 0; i < datosGrafico.length; i++){           
            const dato = datosGrafico[i]
            datosLabels.push(meses[datosGrafico[i].mes]) 
            datosData.push(datosGrafico[i].total_gastos)
            datosColores.push(colores[x])
            x++
            if(x > colores.length){
                x = 0
            }
        }
    }

    if (datosGrafico[0].categoria){ // Si el objeto tiene un atributo categoria entonces vamos a saber que la operacion seleccionada fue la de agrupar por categoria (sino, es la de agrupar por mes) entonces vamos a tener que devolver el grafico circular correspondiente
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
    }
    else{
        useEffect(() => {

            setMostrarTabla(false) // Se deja de mostrar la tabla y se muestra el grafico
            setMostrarGrafico(true)

            const ctx = chartRef.current.getContext('2d');

            new Chart(ctx, {
            type: "bar",
            data: {
                labels: datosLabels,
                datasets: [{
                backgroundColor: datosColores,
                data: datosData
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
            });
        }, []);
    }

    return (
        <canvas ref={chartRef} style={{ width: '100%', maxWidth: '700px'}}/>
    );
}

export default CrearGraficoGastos;