document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const quizSection = document.getElementById('quiz');
    const questionContainer = document.getElementById('question-container');
    const nextButton = document.getElementById('next-button');
    const resultText = document.getElementById('result');

    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];

    // Cargar preguntas desde data.json
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            questions = data.preguntas;
        })
        .catch(error => console.error('Error al cargar las preguntas:', error));

    // Manejar el inicio de sesión
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validación simple (puedes mejorarla)
        if (username && password) {
            loginForm.style.display = 'none';
            quizSection.style.display = 'block';
            showQuestion();
        } else {
            alert('Por favor, ingresa usuario y contraseña.');
        }
    });

    // Mostrar la pregunta actual
    function showQuestion() {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            questionContainer.innerHTML = `
                <p>${question.pregunta}</p>
                ${question.opciones.map((opcion, index) => `
                    <label>
                        <input type="radio" name="answer" value="${index}">
                        ${opcion}
                    </label><br>
                `).join('')}
            `;
        } else {
            showResult();
        }
    }

    // Manejar la siguiente pregunta
    nextButton.addEventListener('click', () => {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (selectedAnswer) {
            if (parseInt(selectedAnswer.value) === questions[currentQuestionIndex].respuesta) {
                score++;
            }
            currentQuestionIndex++;
            showQuestion();
        } else {
            alert('Por favor, selecciona una respuesta.');
        }
    });

    // Mostrar el resultado final
    function showResult() {
        questionContainer.innerHTML = '';
        nextButton.style.display = 'none';
        resultText.textContent = `¡Fin del cuestionario! Puntuación: ${score} de ${questions.length}`;
    }
});
