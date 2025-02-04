document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const area = document.getElementById("area").value;

        if (nombre && area) {
            const usuario = {
                nombre: nombre,
                area: area,
                monedas: 0,
                preguntasIncorrectas: [],
                progreso: 0
            };

            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            usuarios.push(usuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            localStorage.setItem("nombre", nombre);
            localStorage.setItem("area", area);
            localStorage.setItem("monedas", 0);

            window.location.href = "temario.html";
        } else {
            alert("Por favor, completa todos los campos.");
        }
    });

    // Verificar si ya hay un usuario guardado
    const storedNombre = localStorage.getItem("nombre");
    const storedArea = localStorage.getItem("area");

    if (storedNombre && storedArea) {
        document.getElementById("nombre").value = storedNombre;
        document.getElementById("area").value = storedArea;
    }
});
