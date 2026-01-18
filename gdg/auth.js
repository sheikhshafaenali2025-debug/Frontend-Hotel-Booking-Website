function login(role) {
  const user = {
    username: document.getElementById("username").value,
    role: role
  };
  localStorage.setItem("user", JSON.stringify(user));
  window.location.href = "index.html";
}

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}
