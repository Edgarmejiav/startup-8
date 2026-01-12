// Espera a que todo el contenido del DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // Selecciona todas las opciones de todas las preguntas
    const allOptions = document.querySelectorAll('.options li');

    // Añade un detector de eventos (event listener) a cada opción
    allOptions.forEach(option => {
        option.addEventListener('click', () => {

            // Encuentra el contenedor de la pregunta padre
            const questionContainer = option.closest('.question');

            // Si la pregunta ya fue respondida (ya tiene la clase 'answered'), no hagas nada
            if (questionContainer.classList.contains('answered')) {
                return;
            }

            // Marca la pregunta como respondida para evitar más clics
            questionContainer.classList.add('answered');

            // Verifica si la opción clickeada tiene el atributo 'data-correct'
            const isCorrect = option.getAttribute('data-correct') === 'true';

            if (isCorrect) {
                // Si es correcta, añade la clase 'correct'
                option.classList.add('correct');
            } else {
                // Si es incorrecta, añade la clase 'incorrect'
                option.classList.add('incorrect');

                // Opcional: Busca y resalta la respuesta correcta en verde
                const correctOption = questionContainer.querySelector('[data-correct="true"]');
                if (correctOption) {
                    correctOption.classList.add('correct');
                }
            }
        });
    });
});