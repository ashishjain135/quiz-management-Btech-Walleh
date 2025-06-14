const form = document.getElementById('loginForm');
const loginMsg = document.getElementById('loginMsg');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Corrected input field IDs
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  const user = JSON.parse(localStorage.getItem("user"));

  if (user && username === user.username && password === user.password) {
    loginMsg.style.color = "green";
    loginMsg.textContent = "Login successful! Redirecting...";
    setTimeout(() => {
      window.location.href = "quiz/quiz.html"; // Redirect page after login
    }, 1500);
  } else {
    loginMsg.style.color = "red";
    loginMsg.textContent = "Invalid credentials!";
  }
});

