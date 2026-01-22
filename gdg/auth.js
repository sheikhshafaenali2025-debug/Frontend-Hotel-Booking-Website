function login() {
  const username = document.getElementById("username").value;
  const role = document.getElementById("role").value;
  if (!username) {
    alert("Please enter a username");
    return;
  }
  const user = { username, role };
  localStorage.setItem("user", JSON.stringify(user));
  alert("Logged in as " + username + " (" + role + ")");
  closeAuth();
  document.getElementById("logoutBtn").style.display = "inline";
}

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function logout() {
  localStorage.removeItem("user");
  alert("Logged out successfully!");
  window.location.href = "index.html";
}

document.getElementById("loginBtn").onclick = login;
document.getElementById("logoutBtn").onclick = logout;
