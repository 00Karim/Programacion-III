# 🚀 Sistema Web Full-Stack con Docker
# Sistema de administracion de gastos - Grupo 18

Descripcion:

La app te permite interactuar con 2 entidades, gastos e ingresos.
En ambas poder usar distintos filtros, ver 2 graficos y agregar o borrar una instancia.

La informacion de los datos depende de que usuario sea el que esta usando la app. Al principio podes ingresar tus credenciales, que si son correctas se te da un token, y dependiendo de la combinacion, el token va a transportar un id especifico para que todos los datos que se muestren o manipulen pertenezcan a ese usuario con esa id.

A continuacion les dejammos las posibles combinaciones de credenciales para que puedan probar la app: 

1 -
nombre: usuario1
contrasena: contrasenia1
2 -
nombre: usuario2
contrasena: contrasenia2
3 -
nombre: usuario3
contrasena: contrasenia3

Tambien agregamos datos por default cuando se inicializa la base de datos para que puedan visualizar bien la funcionalidad de cada operacion

PD: intentamos cambiar el environment a modo produccion, pero nos daba muchos errores entonces lo dejamos en dev :,(