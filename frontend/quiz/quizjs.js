const questions = [
  {
    question: "Which of the following is a JavaScript data type?",
    options: ["Number", "Float", "Character", "Decimal"],
    answer: 0,
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    options: [
      "msg('Hello World')",
      "alertBox('Hello World')",
      "msgBox('Hello World')",
      "alert('Hello World')"
    ],
    answer: 3,
  },
  {
    question: "How do you create a function in JavaScript?",
    options: [
      "function = myFunc()",
      "function myFunc()",
      "create myFunc()",
      "function:myFunc()"
    ],
    answer: 1,
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: 0,
  },
  {
    question: "How do you declare a JavaScript variable?",
    options: ["v myVar;", "let myVar;", "dim myVar;", "var: myVar;"],
    answer: 1,
  }
];

let currentQ = 0;
let selectedAnswers = Array(questions.length).fill(null);
let timer = 40;
let interval;

function loadQuestion() {
  clearInterval(interval);
  timer = 40;
  document.getElementById("time").innerText = timer;
  interval = setInterval(() => {
    timer--;
    document.getElementById("time").innerText = timer;
    if (timer === 0) {
      nextQuestion();
    }
  }, 1000);

  const q = questions[currentQ];
  document.getElementById("question-text").innerText = q.question;
  document.getElementById("question-counter").innerText = `Question ${currentQ + 1} of ${questions.length}`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  q.options.forEach((opt, idx) => {
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "option";
    radio.value = idx;
    radio.id = `opt${idx}`;
    if (selectedAnswers[currentQ] === idx) radio.checked = true;

    const label = document.createElement("label");
    label.htmlFor = `opt${idx}`;
    label.innerText = opt;

    const br = document.createElement("br");

    optionsDiv.appendChild(radio);
    optionsDiv.appendChild(label);
    optionsDiv.appendChild(br);
  });

  document.getElementById("prevBtn").style.display = currentQ === 0 ? "none" : "inline-block";
  document.getElementById("nextBtn").style.display = currentQ === questions.length - 1 ? "none" : "inline-block";
  document.getElementById("submitBtn").style.display = currentQ === questions.length - 1 ? "inline-block" : "none";
}

function saveAnswer() {
  const opts = document.getElementsByName("option");
  opts.forEach((opt) => {
    if (opt.checked) selectedAnswers[currentQ] = parseInt(opt.value);
  });
}

function nextQuestion() {
  saveAnswer();
  if (currentQ < questions.length - 1) {
    currentQ++;
    loadQuestion();
  }
}

function prevQuestion() {
  saveAnswer();
  if (currentQ > 0) {
    currentQ--;
    loadQuestion();
  }
}

function submitQuiz() {
  saveAnswer();
  clearInterval(interval);
  let score = 0;
  questions.forEach((q, i) => {
    if (selectedAnswers[i] === q.answer) score++;
  });

  document.getElementById("quiz-box").style.display = "none";
  const result = document.getElementById("result");
  result.style.display = "block";
  result.innerHTML = `<h3>🎉 Quiz Submitted!</h3><p>Your Score: ${score} / ${questions.length}</p>`;

  // Redirect after short delay
  setTimeout(() => {
    window.location.href = "quiz.html";
  }, 1500);

}

document.getElementById("nextBtn").addEventListener("click", nextQuestion);
document.getElementById("prevBtn").addEventListener("click", prevQuestion);
document.getElementById("submitBtn").addEventListener("click", submitQuiz);

loadQuestion();
