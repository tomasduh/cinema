const listMovieCards = document.querySelectorAll('.mcc-go-to-detail');

listMovieCards.forEach(element => {
    element.addEventListener('click', () => {
        const id = element.getAttribute('id');
        window.location.href = `/movies/detail/${id}`
    })
});