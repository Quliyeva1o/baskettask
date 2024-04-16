import { User } from "./class.js";

const registerForm = document.querySelector("#register-form");
const userNameInp = document.querySelector("#user-name");
const userEmailInp = document.querySelector("#user-email");
const userPasswordInp = document.querySelector("#user-password");
const userConfirmPassInp = document.querySelector("#user-confirm-password");

//inputs validations
function inputValidation() {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    // Username validations
    if (userNameInp.value.length < 3) {
        userNameInp.nextElementSibling.classList.replace('d-none', 'd-block');
        isValid = false;
    } else {
        userNameInp.nextElementSibling.classList.replace('d-block', 'd-none');
    }

    userNameInp.addEventListener('keyup', () => {
        if (userNameInp.value.length >= 3) {
            userNameInp.nextElementSibling.classList.replace('d-block', 'd-none');
        } else {
            userNameInp.nextElementSibling.classList.replace('d-none', 'd-block');
        }
    });

    // Email validations
    if (!emailPattern.test(userEmailInp.value)) {
        userEmailInp.nextElementSibling.classList.replace('d-none', 'd-block');
        isValid = false;
    } else {
        userEmailInp.nextElementSibling.classList.replace('d-block', 'd-none');
    }


    userEmailInp.addEventListener('keyup', () => {
        if (emailPattern.test(userEmailInp.value)) {
            userEmailInp.nextElementSibling.classList.replace('d-block', 'd-none');
        } else {
            userEmailInp.nextElementSibling.classList.replace('d-none', 'd-block');
        }
    });

    // Password validation
    if (!passwordPattern.test(userPasswordInp.value)) {
        userPasswordInp.nextElementSibling.nextElementSibling.classList.replace('d-none', 'd-block');
        isValid = false;
    } else {
        userPasswordInp.nextElementSibling.classList.replace('d-block', 'd-none');
        if (userPasswordInp.value !== userConfirmPassInp.value) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Passwords do not match",
                showConfirmButton: false,
                timer: 1500,
            });
            isValid = false;
        }
    }
    userPasswordInp.addEventListener('keyup', () => {
        if (passwordPattern.test(userPasswordInp.value)) {
            userPasswordInp.nextElementSibling.nextElementSibling.classList.replace('d-block', 'd-none');

        }
    })

    if (userPasswordInp.value.length < 8) {
        userPasswordInp.nextElementSibling.textContent = 'Password must be at least 8 characters';
        userPasswordInp.nextElementSibling.classList.replace('d-none', 'd-block');
        isValid = false;
    } else {
        userPasswordInp.nextElementSibling.classList.replace('d-block', 'd-none');
    }

    userPasswordInp.addEventListener('keyup', () => {
        if (userPasswordInp.value.length >= 8) {
            userPasswordInp.nextElementSibling.classList.replace('d-block', 'd-none');
        } else {
            userPasswordInp.nextElementSibling.classList.replace('d-none', 'd-block');
        }
    });


    return isValid;
}
//SUBMIT
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (inputValidation()) {
        const newUser = new User(
            userNameInp.value,
            userEmailInp.value,
            userPasswordInp.value

        );
        resetForm();


        //set user to localStorage
        let localUsers = JSON.parse(localStorage.getItem('users')) || [];
        localUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(localUsers));
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User Signed Up successfully",
            showConfirmButton: false,
            timer: 1500,
        }).then((result) => {
            window.location.replace("login.html");
        });
    }
});

// Function to reset form inputs
function resetForm() {
    userNameInp.value = "";
    userEmailInp.value = "";
    userPasswordInp.value = "";
    userConfirmPassInp.value = "";
}



const passwordInput = document.querySelector("#user-password");
const confirmpasswordInput = document.querySelector("#user-confirm-password");
const passwordToggle = document.querySelector("#password-toggle");

passwordToggle.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    const typec = confirmpasswordInput.getAttribute("type") === "password" ? "text" : "password";
    confirmpasswordInput.setAttribute("type", typec);

    if (type === "text") {
        passwordToggle.classList.remove("fa-eye");
        passwordToggle.classList.add("fa-eye-slash");
    } else {
        passwordToggle.classList.remove("fa-eye-slash");
        passwordToggle.classList.add("fa-eye");
    }
});
