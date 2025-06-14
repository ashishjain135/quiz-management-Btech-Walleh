// js/register.js

document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const regMsg = document.getElementById("regMsg");

  if (!username || !email || !password) {
    regMsg.style.color = "red";
    regMsg.textContent = "Please fill all fields.";
    return;
  }

  // Save user data to localStorage
  const newUser = { username, email, password };
  localStorage.setItem("user", JSON.stringify(newUser));

  // Show success message
  regMsg.style.color = "green";
  regMsg.textContent = "Registration successful! Redirecting to login...";

  // Redirect after short delay
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
});
