const sign_in_btn = document.getElementById("sign-in-btn");
const sign_up_btn = document.getElementById("sign-up-btn");
const setAccount = document.getElementById("set-account");
const container = document.querySelector(".container");
const signUp = document.getElementById("sign-up");
const formSignUp = document.getElementById("formSignUp");
const formSignIn = document.getElementById("formSignIn");
const messageSignUn = document.getElementById("message-signUp");
const messageSignIn = document.getElementById("message-signIn");
const messageSetConfig = document.getElementById("message-config");
const logoutButton = document.getElementById("logout");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

formSignUp.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("userName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password-2").value;

  try {
    const res = await fetch("/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const responseData = await res.text();

    if (password !== password2) {
      messageSignUn.innerHTML = "Passwords do not match";
      messageSignUn.style.color = "red";

      document.getElementById("userName").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      document.getElementById("password-2").value = "";
      setTimeout(() => {
        messageSignUn.innerHTML = "";
      }, 2000);
    }

    if (!res.ok) {
      messageSignUn.innerHTML = responseData;
      messageSignUn.style.color = "red";
      setTimeout(() => {
        messageSignUn.innerHTML = "";
      }, 2000);

      if (responseData === "User already exists") {
        sign_in_btn.click();
        document.getElementById("userName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("password-2").value = "";
        setTimeout(() => {
          messageSignUn.innerHTML = "";
        }, 2000);
      }
    } else {
      messageSignUn.innerHTML = responseData;
      messageSignUn.style.color = "green";

      setTimeout(() => {
        sign_in_btn.click();
        document.getElementById("userName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("password-2").value = "";
      }, 2000);
    }
  } catch (error) {
    console.error("Error:", error);
    messageSignIn.innerHTML = "Something went wrong. Please try again.";
    messageSignIn.style.color = "red";
  }
});

formSignIn.addEventListener("submit", async (e) => {
  e.preventDefault();

  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;
  let password2 = document.getElementById("login-password-2").value;

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseData = await res.text();

    if (password !== password2) {
      messageSignIn.innerHTML = "Passwords do not match";
      messageSignIn.style.color = "red";

      document.getElementById("login-email").value = "";
      document.getElementById("login-password").value = "";
      document.getElementById("login-password-2").value = "";
      setTimeout(() => {
        messageSignIn.innerHTML = "";
      }, 2000);
    }

    if (!res.ok) {
      messageSignIn.innerHTML = responseData;
      messageSignIn.style.color = "red";
      setTimeout(() => {
        messageSignIn.innerHTML = "";
      }, 2000);

      if (responseData === "User not found, Please register first") {
        sign_up_btn.click();
        document.getElementById("login-email").value = "";
        document.getElementById("login-password").value = "";
        document.getElementById("login-password-2").value = "";
        setTimeout(() => {
          messageSignIn.innerHTML = "";
        }, 2000);
      }

      if (res.status === 400) {
        document.getElementById("login-password").value = "";
        document.getElementById("login-email").value = "";
        document.getElementById("login-password-2").value = "";
      }
    } else {
      messageSignIn.innerHTML = responseData;
      messageSignIn.style.color = "green";

      setTimeout(() => {
        window.location.href = "/protected";
      }, 2000);
    }
  } catch (error) {
    console.error("Error:", error);
    messageSignIn.innerHTML = "Something went wrong. Please try again.";
    messageSignIn.style.color = "red";
  }
});
