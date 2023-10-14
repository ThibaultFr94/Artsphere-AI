import { artSphereApi } from "./artSphereApi";

const formRegister = document.querySelector('.form-register');
const signinMessage = document.querySelector('.signin-message');

formRegister.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    await artSphereApi.users.register(email, password);
    formRegister.reset();
    const registerImg = document.querySelector('#register img');
    registerImg.setAttribute('src', `asset/img/logout.svg`);
    var form = document.querySelector('#registrationForm');
    form.classList.add('hidden');  
});