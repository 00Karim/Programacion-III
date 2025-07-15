import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

function CrearGraficoIngresos({ setMostrarTabla, setMostrarGrafico, datosGrafico }) {
    const chartRef = useRef(null);
   
    useEffect(() => {
        if (!datosGrafico || datosGrafico.length === 0) return; // si datos graficos no tiene nada adentro entonces no ejecutamos el codigo de abajo porque todas las lineas en las que se intenta acceder a algun atributo dentro de un elemento en el array datos da error

        const colores = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#00C49F", "#FF4444", "#0099CC", "#FF66CC"];
        const meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        setMostrarTabla(false);
        setMostrarGrafico(true);

        const labels = []
        const data = []
        const coloresFondo = []
        let posColor = 0

        const esPorOrigen = !!datosGrafico[0].origen; // esta constante la vamos a usar para poder crear el grafico dinamicamente dependiendo de cual de los dos se piden (por origen o por mes)

        for (let i = 0; i < datosGrafico.length; i++) {
            const dato = datosGrafico[i];
            if (esPorOrigen) {
                labels.push(dato.origen);
            } 
            else {
                labels.push(meses[dato.mes]);
            }
            data.push(parseFloat(dato.total_ingresos));
            coloresFondo.push(colores[posColor]);
            posColor += 1;
            if (posColor > 9){
                posColor = 0
            }
        }

        const ctx = chartRef.current.getContext('2d');

        const chart = new Chart(ctx, {
            type: esPorOrigen ? 'pie' : 'bar', // si el grafico es el de origen entonces usamos un pie graph y sino un gafico de barras
            data: {
                labels,
                datasets: [{
                    label: esPorOrigen ? 'Ingresos por categoría' : 'Ingresos por origen',
                    data,
                    backgroundColor: coloresFondo,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
            },
        });


        return () => {
            chart.destroy();
        }; // borramos el grafico al final para que cuando se renderize nuevamente no se ponga arriba del que estaba antes y siempre sea uno solo
    }, [datosGrafico, setMostrarTabla, setMostrarGrafico]);

        if (!datosGrafico || datosGrafico.length === 0) {
            return (
                <h2 style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
                    ❌ Error: datos no encontrados
                </h2>
            );
        }

        return (
            <canvas ref={chartRef} style={{ width: '100%', maxWidth: '700px' }} />
        );
}

export default CrearGraficoIngresos;