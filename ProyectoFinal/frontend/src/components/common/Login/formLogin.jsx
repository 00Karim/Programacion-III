import { useState } from 'react';

function CrearFormLogin( { setToken, setIdUsuario }){

    const [nombre, setNombre] = useState("")
    const [contrasenia, setContrasenia] = useState("")
    const [errorLogin, setErrorLogin] = useState("")

    const manejarLogin = async () => {
        try {
            const respuesta = await fetch("http://localhost:3000/api/usuarios/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nombre, contrasenia })
            });

            const data = await respuesta.json();
            if (respuesta.ok) {
                localStorage.setItem("token", data.token);
                setToken(data.token); // guardamos el token para poder usarlo en los headers de todos los fetchs y asi tener acceso
                setIdUsuario(data.id_usuario) // guardamos el id del usuario en la variable de estado asi podemos usarla sin tener que decodificar a cada rato
            } else {
                setErrorLogin(data.mensaje || "Credenciales incorrectas");
            }
        } catch (error) {
            setErrorLogin("Error al intentar loguearse");
        }
    };

    
    return (
        <div className="App">
            <h2>Iniciar sesión</h2>
            {errorLogin && <p style={{ color: "red" }}>{errorLogin}</p>}
            <input
                type="text"
                placeholder="Nombre de usuario"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseniaa"
                value={contrasenia}
                onChange={(e) => setContrasenia(e.target.value)}
            />
            <button onClick={manejarLogin}>Ingresar</button>
        </div>
    );
    
}

export default CrearFormLogin;