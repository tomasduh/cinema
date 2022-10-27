const formulario = document.getElementById('form_login');
const email = document.getElementById('email');
const inputPassword = document.getElementById('password');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault()
    const validateLogin = await fetch("/validate",{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            password: inputPassword.value,
        })
    });
    if (validateLogin.ok) {
        const result = await validateLogin.json();
        if(result.email){
            Swal.fire({
                icon: 'error',
                text: 'Incorrect email',
                confirmButtonText: 'Reintentar'
            })
        }else if(result.password){
            Swal.fire({
                icon: 'error',
                text: 'Incorrect password',
                confirmButtonText: 'Reintentar'
            })
        }else{
            console.log("ando en el else")
            const login = await fetch("/login",{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: result.user,
                })
            });
            console.log("hola")
            if(login.ok){
                window.location.href = "/movies"
            }
        }
    }
});
