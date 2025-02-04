document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const areaSelect = document.getElementById("area");

    // Cargar áreas dinámicamente desde usuarios.json
    fetch("usuarios.json")
        .then(response => response.json())
        .then(data => {
            const areasUnicas = new Set(data.usuarios.map(usuario => usuario.area)); // Obtener áreas únicas
            areasUnicas.forEach(area => {
                const option = document.createElement("option");
                option.value = area; // Usar el valor exacto del área
                option.textContent = area;
                areaSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error al cargar áreas:", error);
        });

    // Validar el inicio de sesión
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const nombre = document.getElementById("nombre").value.trim();
            const area = document.getElementById("area").value;

            // Validar que los campos no estén vacíos
            if (!nombre || !area) {
                alert("Por favor, completa todos los campos.");
                return;
            }

            // Verificar si el usuario está autorizado
            fetch("usuarios.json")
                .then(response => response.json())
                .then(data => {
                    const usuarioAutorizado = data.usuarios.find(
                        usuario => usuario.nombre.toLowerCase() === nombre.toLowerCase() && 
                                  usuario.area.toLowerCase() === area.toLowerCase()
                    );

                    if (usuarioAutorizado) {
                        // Crear un nuevo usuario
                        const nuevoUsuario = {
                            nombre: nombre,
                            area: area,
                            monedas: 0,
                            preguntasIncorrectas: [],
                            progreso: 0
                        };

                        // Obtener usuarios existentes o inicializar un array vacío
                        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
                        usuarios.push(nuevoUsuario); // Agregar el nuevo usuario
                        localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Guardar en localStorage

                        // Guardar datos del usuario actual
                        localStorage.setItem("nombre", nombre);
                        localStorage.setItem("area", area);
                        localStorage.setItem("monedas", 0);
                        localStorage.setItem("temasCompletados", JSON.stringify([])); // Inicializar temas completados

                        // Redirigir a temario.html
                        window.location.href = "temario.html";
                    } else {
                        alert("Usuario no autorizado. Verifica tu nombre y área.");
                    }
                })
                .catch(error => {
                    console.error("Error al cargar usuarios autorizados:", error);
                    alert("Error al validar el usuario. Intenta nuevamente.");
                });
        });
    }
});
