const lista = document.querySelectorAll('.component--order');
lista.forEach((element) => {
    element.addEventListener('click', () => {
        const id = element.getAttribute('id');
        // console.log(id)
        window.location.href = `/history/order/${id}`
    })
})