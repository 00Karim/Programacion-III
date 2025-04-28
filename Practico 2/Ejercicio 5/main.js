const enviar = document.querySelector('#enviar');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const edad = document.getElementById('edad');

const errorNombre = document.getElementById('errorNombre');
const errorEmail = document.getElementById('errorEmail');
const errorEdad = document.getElementById('errorEdad');

const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

enviar.addEventListener('click', (evento) => {
    evento.preventDefault();
    
    let valido = true;

    //Validacion de nombre
    if (nombre.value.trim() === ""){
        errorNombre.textContent = "El nombre es obligatorio";
        valido = false;
    }
    else {
        errorNombre.textContent = "";
    };

    //Validacion de email
    if (email.value.trim() === "") {
        errorEmail.textContent = "El email es obligatorio";
        valido = false;
    }
    else if (regex.test(email.value) === false) {
        errorEmail.textContent = "El formato del email no es valido";
        valido = false;
    }
    else {
        errorEmail.textContent = "";
    };

    //Validacion de edad
    if (edad.value.trim() === "") {
        errorEdad.textContent = "La edad es obligatoria";
        valido = false;
    }
    else if (edad.value < 18) {
        errorEdad.textContent = "La edad debe ser mayor de 18";
        valido = false;
    }
    else {
        errorEdad.textContent = "";
    };

    if (valido) {
        alert("Formulario enviado");
    };
});