/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
export {};

const form = document.querySelector("#register-form") as HTMLFormElement;
const usernameInput = document.querySelector("#username") as HTMLInputElement;
const emailInput = document.querySelector("#email") as HTMLInputElement;
const passwordInput = document.querySelector("#password") as HTMLInputElement;
const passwordConfirmInput = document.querySelector("#password-confirm") as HTMLInputElement;
const checkbox = document.querySelector("#checkbox") as HTMLInputElement;

const showError = (input: HTMLInputElement, message: string) => {
    input.classList.add("error");
    input.classList.remove("success");
    input.parentNode?.parentNode?.querySelector(".error-msg")?.classList.remove("hidden");
    input.parentNode!.parentNode!.querySelector<HTMLSpanElement>(".error-msg")!.innerText = message;
};

const showSuccess = (input: HTMLInputElement) => {
    input.classList.add("success");
    input.classList.remove("error");
    input.parentNode?.parentNode?.querySelector(".error-msg")?.classList.add("hidden");
};

const checkEmpty = (inputs: HTMLInputElement[]) => {
    inputs.forEach((input) => {
        if (input.value.trim() === "") {
            showError(input, `${input.placeholder} is required`);
        } else showSuccess(input);
    });
};

const checkLength = (input: HTMLInputElement, minLength: number, maxLength: number) => {
    if (input.value.trim() === "") {
        return;
    }
    if (input.value.length < minLength) {
        showError(input, `${input.placeholder} must be at least ${minLength} characters long`);
    } else if (input.value.length > maxLength) {
        showError(input, `${input.placeholder} must be maximum ${maxLength} characters long`);
    } else showSuccess(input);
};

const passwordMatch = (password: HTMLInputElement, passwordConfirmation: HTMLInputElement) => {
    if (password.value.trim() === "" || passwordConfirmation.value.trim() === "") {
        return;
    }
    if (password.value === passwordConfirmation.value) {
        showSuccess(password);
        showSuccess(passwordConfirmation);
    } else {
        showError(passwordConfirmation, `Passwords must match`);
    }
};

const checkEmail = (input: HTMLInputElement) => {
    if (input.value.trim() === "") {
        return;
    }
    if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(input.value)) {
        showSuccess(input);
    } else showError(input, `Email is incorrect`);
};

const checkCheckbox = (input: HTMLInputElement) => {
    if (input.checked) {
        input.parentNode?.querySelector(".checkbox")!.classList.remove("error");
    } else input.parentNode?.querySelector(".checkbox")!.classList.add("error");
};

const validate = (e: Event) => {
    e.preventDefault();
    checkEmpty([usernameInput, emailInput, passwordInput, passwordConfirmInput]);
    checkLength(usernameInput, 6, 20);
    checkLength(passwordInput, 8, 265);
    checkEmail(emailInput);
    passwordMatch(passwordInput, passwordConfirmInput);
    checkCheckbox(checkbox);
};

form.addEventListener("submit", validate);
