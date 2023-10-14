const formLogin = document.querySelector('.form-login');

formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    await artSphereApi.users.login(email, password);
    formLogin.reset();
    const registerImg = document.querySelector('#register img');
    registerImg.setAttribute('src', `asset/img/logout.svg`);
    var form = document.querySelector('#registrationForm');
    form.classList.add('hidden');    
});