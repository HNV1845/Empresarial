document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const nombre = document.getElementById("nombre").value;
            const area = document.getElementById("area").value;
            if (nombre && area) {
                localStorage.setItem("nombre", nombre);
                localStorage.setItem("area", area);
                localStorage.setItem("monedas", 0);
                window.location.href = "temario.html";
            } else {
                alert("Por favor, completa todos los campos.");
            }
        });
    }
});
