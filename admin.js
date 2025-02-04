document.addEventListener("DOMContentLoaded", function() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const listaUsuarios = document.getElementById("usuariosLista");

    function mostrarUsuarios() {
        listaUsuarios.innerHTML = ""; // Limpiar la lista antes de mostrar
        if (usuarios.length === 0) {
            listaUsuarios.innerHTML = "<tr><td colspan='6'>No hay usuarios registrados.</td></tr>";
        } else {
            usuarios.forEach((usuario, index) => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${usuario.nombre}</td>
                    <td>${usuario.area}</td>
                    <td>${usuario.monedas || 0}</td>
                    <td>${usuario.preguntasIncorrectas ? usuario.preguntasIncorrectas.join(", ") : ""}</td>
                    <td><progress value="${usuario.progreso || 0}" max="100"></progress></td>
                    <td><button onclick="eliminarUsuario(${index})">Eliminar</button></td>
                `;
                listaUsuarios.appendChild(fila);
            });
        }
    }

    window.eliminarUsuario = function(index) {
        usuarios.splice(index, 1); // Eliminar el usuario del array
        localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Actualizar localStorage
        mostrarUsuarios(); // Volver a mostrar la lista actualizada
    };

    mostrarUsuarios(); // Mostrar los usuarios al cargar la página
});
