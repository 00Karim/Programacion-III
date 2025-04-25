document.getElementById('form-tarea').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const input = document.getElementById('nueva-tarea');
    const texto = input.value.trim();
  
    if (texto !== "") {
      const li = document.createElement('li');
      li.textContent = texto;
  
      li.addEventListener('click', function() {
        li.classList.toggle('completado');
      });
  
      document.getElementById('lista-tareas').appendChild(li);
      input.value = "";
    }
  });
  