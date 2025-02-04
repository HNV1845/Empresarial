document.addEventListener("DOMContentLoaded", function() {
    const area = localStorage.getItem("area");
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const preguntas = data.preguntas[area] || [];
            const preguntasContainer = document.getElementById("preguntas");
            preguntas.forEach((pregunta, index) => {
                const divPregunta = document.createElement("div");
                divPregunta.classList.add("pregunta-item");
                divPregunta.innerHTML = `<p>${pregunta.pregunta}</p>` +
                    pregunta.opciones.map((opcion, i) => 
                        `<label><input type='radio' name='pregunta${index}' value='${i}'> ${opcion}</label><br>`
                    ).join("");
                preguntasContainer.appendChild(divPregunta);
            });
        });
    document.getElementById("btnEnviar").addEventListener("click", function() {
        let correctas = 0;
        document.querySelectorAll(".pregunta-item").forEach((divPregunta, index) => {
            const seleccionada = divPregunta.querySelector("input[type='radio']:checked");
            if (seleccionada && parseInt(seleccionada.value) === data.preguntas[area][index].respuesta) {
                correctas++;
            }
        });
        const resultado = document.getElementById("resultado");
        resultado.style.display = "block";
        resultado.textContent = `Respuestas correctas: ${correctas} de 8`;
        if (correctas >= 4) {
            let temasCompletados = JSON.parse(localStorage.getItem("temasCompletados")) || [];
            const temaActual = parseInt(localStorage.getItem("temaActual"));
            if (!temasCompletados.includes(temaActual)) {
                temasCompletados.push(temaActual);
                localStorage.setItem("temasCompletados", JSON.stringify(temasCompletados));
            }
            setTimeout(() => window.location.href = "temario.html", 3000);
        } else {
            resultado.textContent += "\nNo aprobaste, vuelve a leer el contenido e intenta nuevamente.";
        }
    });
});
