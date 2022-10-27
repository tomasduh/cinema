const formulario = document.getElementById('form_login');
const email = document.getElementById('email');
const nameUser = document.getElementById('name');
const inputPassword1 = document.getElementById('password');
const inputPassword2 = document.getElementById('passwordComfirm');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault()
    if(inputPassword1.value !== inputPassword2.value){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Password not mach'
          });
    }else{
        const validateEmail = await fetch("/register",{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: 0,
                name: nameUser.value,
                email: email.value,
                password: inputPassword1.value,
                passwordComfirm: inputPassword2.value
            })
        });
        if (validateEmail.ok) {
            const result = await validateEmail.json();
            if(result.data.id == 0){
                Swal.fire({
                    icon: 'error',
                    text: 'Email already exists',
                    confirmButtonText: 'Reintentar'
                })
            }else{
                Swal.fire({
                    icon: 'success',
                    text: 'user created',
                    confirmButtonText: 'Login'
                }).then((result)=>{
                    if (result.isConfirmed) {
                        window.location.href = "/login"
                    }
                });
            }
        }
    }
});