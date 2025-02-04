document.addEventListener("DOMContentLoaded", function() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const listaUsuarios = document.getElementById("usuariosLista");
    
    function mostrarUsuarios() {
        listaUsuarios.innerHTML = "";
        usuarios.forEach((usuario, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${usuario.nombre}</td>
                <td>${usuario.area}</td>
                <td>${usuario.monedas}</td>
                <td>${usuario.preguntasIncorrectas.join(", ")}</td>
                <td><progress value="${usuario.progreso}" max="100"></progress></td>
                <td><button onclick="eliminarUsuario(${index})">Eliminar</button></td>
            `;
            listaUsuarios.appendChild(fila);
        });
    }
    
    function eliminarUsuario(index) {
        usuarios.splice(index, 1);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        mostrarUsuarios();
    }
    
    mostrarUsuarios();
    window.eliminarUsuario = eliminarUsuario;
});

