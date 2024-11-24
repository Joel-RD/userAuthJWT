const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const signUp = document.getElementById("sign-up");
const formSignUp = document.getElementById("formSignUp");
const formSignIn = document.getElementById("formSignIn");
const messageSignUn = document.getElementById("message-signUp");
const messageSignIn = document.getElementById("message-signIn");
const logoutButton = document.getElementById("logout");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

formSignUp.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("userName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("/register", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  })
    .then((res) => {
      if (!res.ok) {
        messageSignUn.innerHTML = "User already exists";
        messageSignUn.style.color = "red";
      } else {
        messageSignUn.innerHTML = "Usuario registrado correctamente";
        messageSignUn.style.color = "green";

        setTimeout(() => {
          const click = document.getElementById("sign-in-btn");
          click.click();
        }, 2000);
      }
    })
    .catch((error) => console.error(error));
});

formSignIn.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  console.log(email, password);

  fetch("/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) {
        messageSignIn.innerHTML = "User not found, Please register first";
        messageSignIn.style.color = "red";
        const click = document.getElementById("sign-up-btn");
        click.click();
      } else {
        messageSignIn.innerHTML = "User logged in";
        messageSignIn.style.color = "green";

        console.log(email, password);

        setTimeout(() => {
          window.location.href = "/protected";
        }, 5000);
      }
    })
    .catch((error) => console.error(error));
});
