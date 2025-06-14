const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyper Text Markup Leveler"
    ],
    answer: 1,
  },
  {
    question: "Which tag is used to insert an image in HTML?",
    options: ["<pic>", "<image>", "<img>", "<src>"],
    answer: 2,
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<href>", "<a>", "<url>"],
    answer: 2,
  },
  {
    question: "Which of the following is the correct HTML element for inserting a line break?",
    options: ["<br>", "<break>", "<lb>", "<newline>"],
    answer: 0,
  },
  {
    question: "Which tag is used to define a table in HTML?",
    options: ["<table>", "<tab>", "<tbl>", "<t>"],
    answer: 0,
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
