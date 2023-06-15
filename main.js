// VARIABLES - (¿Para qué? para traernos los ELEMENTOS)
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


//HIDE AND GO - (Empezamos a jugar con los EVENTOS)
function hideViews() {
    homeDiv.classList.add("hide");
    schoolDiv.classList.add("hide");
    workDiv.classList.add("hide");
    studyDiv.classList.add("hide");
    friendsDiv.classList.add("hide");
  }

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

axios
.get("https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=boolean")
  .then((res) => console.table(res.data.results))
  .catch((err) => console.error(err));





//ADD EVENT - (Seguimos jugando con los EVENTOS-ACCIÓN) - OJO AL CSS
homeNav.addEventListener("click", goHome);
schoolNav.addEventListener("click", goSchool);
workNav.addEventListener("click", goWork);
studyNav.addEventListener("click", goStudy);
friendsNav.addEventListener("click", goFriends);
