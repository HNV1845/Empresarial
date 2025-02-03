document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const nombre = document.getElementById("nombre").value;
        const area = document.getElementById("area").value;
        
        if (nombre && area) {
            localStorage.setItem("nombre", nombre);
            localStorage.setItem("area", area);
            window.location.href = "dashboard.html";
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

