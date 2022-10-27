const cartContainer = document.querySelector('.cart-container');
const checkoutButton = document.querySelector('.checkout-button-container');
const closeButton = document.querySelector('#closeButton');
const openButton = document.querySelector('#openButton');
let moviesInCart = [];

window.onload = async () => {
	const userId = (user.id).toString()
	let moviesCookies= await fetch(`http://localhost:3000/api/v1/shop/get/${userId}`)
	moviesCookies = await moviesCookies.json();
	if(!moviesCookies.code){
		moviesInCart = []
		moviesCookies.forEach(movie => {
			moviesInCart.push(movie)
		})
	}
};

const openCart = async () => {
	cartContainer.style.right = `0`;
	renderMovieInCart(moviesInCart);
};

const closeCart = () => {
	cartContainer.style.right = `-30%`;
};

const showCheckoutButton = (arrLength) => {
	if (arrLength > 0) {
		checkoutButton.style.display = 'block';
	} else {
		checkoutButton.style.display = 'none';
	}
};

openButton.addEventListener('click', openCart);

closeButton.addEventListener('click', closeCart);

//cargar los datos del localStorage a moviesInCart para luego renderizar las movies del shoppingCart




//redirige a LOGIN / MYHISTORY dependiendo de la sesion
const renderCart = () => {
	window.location = '/cart/index.html';
}

//Barra de error visible para el usuario
const errorBar = document.querySelector('.error-bar-container')
const messageContainer = document.getElementById('errorMessage')

const throwError = (message) => {
	messageContainer.innerText = message
	errorBar.style.display = 'block'
	errorBar.style.opacity = '1'
	setTimeout(() => {
	errorBar.style.display = 'none'
	errorBar.style.opacity = '0'
	}, 2000);
}

const list = document.querySelectorAll('.mcc-table__btn--add');
list.forEach(element => {
	element.addEventListener('click', async  () => {
		const dataMovie = JSON.parse(element.getAttribute('id'));
		addToCart(dataMovie);
	})
})

//funcion para añadir una peli al shopping cart
const addToCart = async (movie) => {
	if(moviesInCart.length == 10){
		return throwError("Solo puedes agregar 10 peliculas")
	}
	const indexMovies = moviesInCart.map((movie) => movie.id)
	//comprobamos que la pelicula seleccionada no este repetida en moviesCart
	if (!indexMovies.includes(movie.id)) {
		moviesInCart.push(movie)
		renderMovieInCart(moviesInCart)
		showCheckoutButton(moviesInCart.length)
		try {
			const clearCookie = await fetch("/api/v1/shop/clear",{
				method: 'DELETE'
			})
			if(clearCookie.ok){
				const response = await fetch("/api/v1/shop/add", {
					method: 'POST',
					headers: {
					'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						id_user: user.id,
						movies: moviesInCart,
					})
				});
				if (response.ok) {
					const result = await response.json();
				}
			}
			} catch (err) {
			console.error(err);
		}
		throwError('Película añadida')

		openCart()
	} else {
		throwError('Película repetida')
		return
	}
};



const cartList = document.querySelector('.cart-list')

//renderizar moviesInCart
const renderMovieInCart = async (moviesArray) => {
	try {
		let template = ``;
		moviesArray.map((movie) => {
			let category;
			if(!movie.genres || movie.genres.length === 0) {
				category = "Dont have category"
			}else{
				category = movie.genres[0].length == 1 ? movie.genres : movie.genres[0];
			}
			const imageUrl = 'https://image.tmdb.org/t/p/w500/' 
			const cart = `
				<div class="cart-item" id="${movie.id}">
					<div class="cart-item-img">
						<img
						src="${(movie.path).includes('.com') ? movie.path : (imageUrl + movie.path)}" alt="movie-img">
					<div class="cart-info-container">
						<span><b>Titulo: </b>${movie.title}</span>
						<span><b>Genero: </b>${category}</span>
						<span><b>Calificación: </b>${movie.vote_average}</span>
					</div>
				</div>
				<div class="delete-button" onclick="deleteMovieInCart(${movie.id})">X</div>
			</div>
			`;
			template += cart;
		});
		cartList.innerHTML = template;
	} catch (error) {
		console.error(error);
	}
};

//funcion de eliminar elemento de shopping cart
const deleteMovieInCart = async (id) => {
	const indexMovie = moviesInCart.findIndex((movie) => movie.id === id);

	try{
		const deleteMovie = await fetch("http://localhost:3000/api/v1/shop/del",{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id_user: user.id,
				id_movie: id
			})
		});
		if (deleteMovie.ok) {
			const result = await deleteMovie.json();
			moviesInCart.splice(indexMovie, 1);
			showCheckoutButton(moviesInCart.length);
			localStorage.setItem('shoppingCart', JSON.stringify(moviesInCart));
			renderMovieInCart(moviesInCart);
		}
	}catch(err){
		throwError(err);
	}

};
