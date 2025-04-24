document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe
  
    // Limpiar errores anteriores
    document.getElementById('error-nombre').textContent = "";
    document.getElementById('error-email').textContent = "";
    document.getElementById('error-edad').textContent = "";
  
    // Obtener valores
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const edad = parseInt(document.getElementById('edad').value);
  
    let valido = true;
  
    // Validación del nombre
    if (nombre === "") {
      document.getElementById('error-nombre').textContent = "El nombre es obligatorio.";
      valido = false;
    }
  
    // Validación del email
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      document.getElementById('error-email').textContent = "El email es obligatorio.";
      valido = false;
    } else if (!patronEmail.test(email)) {
      document.getElementById('error-email').textContent = "El formato del email no es válido.";
      valido = false;
    }
  
    // Validación de edad
    if (isNaN(edad)) {
      document.getElementById('error-edad').textContent = "La edad debe ser un número.";
      valido = false;
    } else if (edad <= 18) {
      document.getElementById('error-edad').textContent = "Debes tener más de 18 años.";
      valido = false;
    }
  
    if (valido) {
      console.log("Formulario válido. Enviando...");
      alert("Formulario enviado con éxito.");
    }
  });
  