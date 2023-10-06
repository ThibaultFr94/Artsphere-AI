const formLogin = document.querySelector('.form-login');

formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const values = JSON.stringify(Object.fromEntries(new FormData(e.target)));
    
    const requestInfos = new Request('http://localhost:3000/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: values,
    });

    const request = await fetch(requestInfos);
    const response = await request.json();
    formLogin.reset();
    window.sessionStorage.setItem('user', JSON.stringify(response.data));
    const registerImg = document.querySelector('#register img');
    registerImg.setAttribute('src', `asset/img/logout.svg`);
    var form = document.querySelector('#registrationForm');
    form.classList.add('hidden');    
    
    // console.log(registerImg);
});