#!/bin/bash

URL_BASE="http://localhost:3001/api/ingresos"

while true; do
    echo -e "\e[36m
╔═════════════════════════════════════════════╗
║             ELEGÍ UN TEST A EJECUTAR        ║
╠═════════════════════════════════════════════╣
║  1 - Crear un nuevo ingreso                 ║
║  0 - Salir                                  ║
╚═════════════════════════════════════════════╝
\e[0m"

    echo -ne "\e[1;32mIngresa el número de tu opción: \e[0m"
    read -r eleccion

case $eleccion in
    1)
        echo -e "\e[35m\nTest: Crear un ingreso\e[0m"
        read -p "Ingresa la origen: " origen
        read -p "Ingresa la cantidad: " cantidad
        read -p "Ingresa la fecha: " fecha

        curl -s -X POST "$URL_BASE/" \
        -H "Content-Type: application/json" \
        -d "{\"categoria\":\"$categoria\", \"origen\":$origen, \"fecha\":\"$fecha\"}"
        ;;
    0)
        echo -e "\n\e[33mSaliste del tester\e[0m"
        break
        ;;
    *)
        echo -e "\e[31mOpción inválida. Por favor, intentá de nuevo.\e[0m"
        ;;
    esac

    echo -e "\n\e[34mToca enter para elegir otro test...\e[0m"
    read -r
    clear
done