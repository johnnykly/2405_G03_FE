const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const openRegisterLink = document.getElementById("openRegisterModal");
const showLoginLink = document.getElementById("showLogin");
const closeLoginBtn = document.getElementById("closeLoginModal");
const closeRegisterBtn = document.getElementById("closeRegisterModal");

openRegisterLink?.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.classList.add("hidden");
  registerModal.classList.remove("hidden");
});

showLoginLink?.addEventListener("click", (e) => {
  e.preventDefault();
  registerModal.classList.add("hidden");
  loginModal.classList.remove("hidden");
});

closeLoginBtn?.addEventListener("click", () => {
  loginModal.classList.add("hidden");
});

closeRegisterBtn?.addEventListener("click", () => {
  registerModal.classList.add("hidden");
});

document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const res = await fetch("https://grupp-3.vercel.app/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      const { token, user } = data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        alert(`Välkommen admin ${user.firstName}`);
        window.location.href = "admin.html";
      } else {
        alert(`Välkommen ${user.firstName}`);
        window.location.href = "index.html";
      }
    } else {
      alert(data.message || "Fel vid inloggning");
    }
  } catch (err) {
    console.error(err);
    alert("Något gick fel vid inloggning");
  }
});

document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const firstName = document.getElementById("reg-firstname").value;
  const lastName = document.getElementById("reg-lastname").value;
  const email = document.getElementById("reg-email").value;
  const confirmEmail = document.getElementById("reg-email-confirm").value;
  const password = document.getElementById("reg-password").value;
  const confirmPassword = document.getElementById("reg-password2").value;

  if (email !== confirmEmail) return alert("E-post matchar inte");
  if (password !== confirmPassword) return alert("Lösenord matchar inte");

  try {
    const res = await fetch("https://grupp-3.vercel.app/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registreringen lyckades. Du kan nu logga in.");
      registerModal.classList.add("hidden");
      loginModal.classList.remove("hidden");
    } else {
      alert(data.message || "Något gick fel vid registrering");
    }
  } catch (err) {
    console.error(err);
    alert("Något gick fel vid registrering");
  }
});

if (window.location.pathname.includes("admin.html")) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "admin") {
    alert("Du har inte behörighet att besöka adminpanelen.");
    window.location.href = "index.html";
  }
}

async function fetchUsersForAdmin() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.role !== "admin") return;

  try {
    const res = await fetch("https://grupp-3.vercel.app/api/users", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    const users = await res.json();
    console.log("All users:", users);
    // render user list to admin.html
  } catch (err) {
    console.error("Failed to fetch users", err);
  }
}

if (window.location.pathname.includes("admin.html")) {
  fetchUsersForAdmin();
}
