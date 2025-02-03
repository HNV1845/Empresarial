document.addEventListener("DOMContentLoaded", function() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const listaUsuarios = document.getElementById("listaUsuarios");
    
    function mostrarUsuarios() {
        listaUsuarios.innerHTML = "";
        usuarios.forEach((usuario, index) => {
            const li = document.createElement("li");
            li.textContent = `${usuario.nombre} - ${usuario.area}`;
            
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.onclick = function() {
                eliminarUsuario(index);
            };
            
            li.appendChild(btnEliminar);
            listaUsuarios.appendChild(li);
        });
    }
    
    function eliminarUsuario(index) {
        usuarios.splice(index, 1);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        mostrarUsuarios();
    }
    
    mostrarUsuarios();
});

