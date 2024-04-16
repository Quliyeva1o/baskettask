console.log("HEY LOGIN");
import data from "./data.js";

const loginForm = document.querySelector("#login-form");
const userNameInp = document.querySelector("#user-name");
const passwordInp = document.querySelector("#user-password");
const rememberMe = document.querySelector("#remember-me");
const passwordToggle = document.querySelector("#password-toggle");

//eye
passwordToggle.addEventListener("click", () => {
  const type = passwordInp.getAttribute("type") === "password" ? "text" : "password";
  passwordInp.setAttribute("type", type);

  if (type === "text") {
    passwordToggle.classList.remove("fa-eye");
    passwordToggle.classList.add("fa-eye-slash");
  } else {
    passwordToggle.classList.remove("fa-eye-slash");
    passwordToggle.classList.add("fa-eye");
  }
});


loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const localUsers = JSON.parse(localStorage.getItem("users")) || [];

  console.log("user name: ", userNameInp.value);
  console.log("user password: ", passwordInp.value);
  const rememberMeChecked = rememberMe.checked;

  const foundUser = localUsers.find((x) => x.username === userNameInp.value && x.password === passwordInp.value);

  if (foundUser) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "User Signed In successfully",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      foundUser.isLogged = true;
      localStorage.setItem("users", JSON.stringify(localUsers));
      if (rememberMeChecked) {
        localStorage.setItem("rememberedUser", JSON.stringify(foundUser));
      } else {
        sessionStorage.setItem("notrememberedUser", JSON.stringify(foundUser));
      }
    }).then(() => {
      window.location.replace('index.html');
    });
  } else {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Username or password is incorrect!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});

window.addEventListener('DOMContentLoaded', () => {
  let rememberedUser = JSON.parse(localStorage.getItem("rememberedUser")) || [];
  let notrememberedUser = JSON.parse(sessionStorage.getItem("notrememberedUser")) || [];




  if (!Array.isArray(rememberedUser)) {
    rememberedUser = [rememberedUser];
  }



  if (!Array.isArray(notrememberedUser)) {
    notrememberedUser = [notrememberedUser];
  }

  const foundUser = rememberedUser.find(user => user); 

  if (foundUser) {
      userNameInp.value = foundUser.username;
      passwordInp.value = foundUser.password;
      rememberMe.checked = true;
  }
});
