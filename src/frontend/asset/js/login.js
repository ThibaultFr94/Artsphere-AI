const formRegister = document.querySelector('.form-login');

formRegister.addEventListener('submit', async (e) => {
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
});