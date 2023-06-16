// VARIABLES - Declaración de variables para almacenar elementos del DOM
const homeNav = document.getElementById("homeNav");
const schoolNav = document.getElementById("schoolNav");
const workNav = document.getElementById("workNav");
const studyNav = document.getElementById("studyNav");
const friendsNav = document.getElementById("friendsNav");

const homeDiv = document.getElementById("home");
const schoolDiv = document.getElementById("school");
const workDiv = document.getElementById("work");
const studyDiv = document.getElementById("study");
const friendsDiv = document.getElementById("friends");

const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");

// HIDE - Función para ocultar todas las vistas (secciones)
function hideViews() {
  homeDiv.classList.add("hide");
  schoolDiv.classList.add("hide");
  workDiv.classList.add("hide");
  studyDiv.classList.add("hide");
  friendsDiv.classList.add("hide");
}

// VIEW - Funciones para mostrar vistas (secciones) específicas
function goHome() {
  hideViews();
  homeDiv.classList.remove("hide");
}

function goSchool() {
  hideViews();
  schoolDiv.classList.remove("hide");
}

function goWork() {
  hideViews();
  workDiv.classList.remove("hide");
}

function goStudy() {
  hideViews();
  studyDiv.classList.remove("hide");
}

function goFriends() {
  hideViews();
  friendsDiv.classList.remove("hide");
}

//AXIOS - Lógica para obtener preguntas del API y mostrarlas en el cuestionario
axios
  .get(
    "https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=boolean"
  )
  .then((res) => {
    const preguntas = res.data.results;
    let preguntaIndex = 0;

    function resetState() {
      nextButton.classList.add("hide");
      while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
      }
    }

    function setStatusClass(element) {
      if (element.dataset.correct) {
        element.classList.add("correct");
      } else {
        element.classList.add("wrong");
      }
    }

    function decodeHTML(html) {
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    }

    function mostrarPregunta() {
      const preguntaActual = preguntas[preguntaIndex];
      const decodedQuestion = decodeHTML(preguntaActual.question);
      questionElement.innerText = decodedQuestion;

      answerButtonsElement.innerHTML = "";

      preguntaActual.incorrect_answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("answer-btn");
        button.addEventListener("click", () => seleccionarRespuesta(false));
        answerButtonsElement.appendChild(button);
      });

      const correctButton = document.createElement("button");
      correctButton.innerText = preguntaActual.correct_answer;
      correctButton.classList.add("answer-btn");
      correctButton.addEventListener("click", () => seleccionarRespuesta(true));
      answerButtonsElement.appendChild(correctButton);
    }

    function seleccionarRespuesta(correct) {
      if (correct) {
        console.log("Respuesta correcta");
      } else {
        console.log("Respuesta incorrecta");
      }

      preguntaIndex++;

      if (preguntaIndex === preguntas.length) {
        mostrarResultados();
      } else {
        mostrarPregunta();
      }
    }

    function mostrarResultados() {
      questionContainerElement.classList.add("hide");
      console.log("Mostrar resultados");

      const resultadoElement = document.getElementById("resultado");
      const numRespuestasCorrectas = 0; // Actualiza esta variable con el número de respuestas correctas
      resultadoElement.innerText = `Has respondido ${numRespuestasCorrectas} preguntas correctamente de ${preguntas.length}.`;
      resultadoElement.classList.remove("hide");

      const reiniciarButton = document.createElement("button");
      reiniciarButton.innerText = "Volver a empezar";
      reiniciarButton.classList.add("reiniciar-btn");
      reiniciarButton.addEventListener("click", reiniciarJuego);
      resultadoElement.appendChild(reiniciarButton);
    }

    function reiniciarJuego() {
      preguntaIndex = 0; // Reinicia el índice de la pregunta actual
      resultadoElement.classList.add("hide");
      startButton.classList.remove("hide");
    }

    function setNextQuestion() {
      resetState();
      mostrarPregunta();
    }

    function startGame() {
      resetState();
      preguntaIndex = 0; // Reinicia el índice de la pregunta actual
      startButton.classList.add("hide");
      questionContainerElement.classList.remove("hide");
      mostrarPregunta(); // Muestra la primera pregunta
    }

    startButton.addEventListener("click", startGame);
    nextButton.addEventListener("click", setNextQuestion);
  })
  .catch((err) => console.error(err));

// EVENT LISTENERS - Para los botones de navegación
homeNav.addEventListener("click", goHome);
schoolNav.addEventListener("click", goSchool);
workNav.addEventListener("click", goWork);
studyNav.addEventListener("click", goStudy);
friendsNav.addEventListener("click", goFriends);
